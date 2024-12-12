import React, { useState, useEffect, useRef } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"; // Updated import
import io from "socket.io-client";
import { Phone } from "lucide-react";

const WebRTCAudio = () => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("Connecting...");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [callEnabled, setCallEnabled] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null); // Incoming call state
  const [callAccepted, setCallAccepted] = useState(false);

  const localAudioRef = useRef(null); // Updated to use audio instead of video
  const remoteAudioRef = useRef(null); // Updated to use audio instead of video
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", async () => {
      setUserId(newSocket.id);

      // Constraints for audio-only (no video)
      const constraints = { audio: true, video: false };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Set local audio stream
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }

      const peerConnection = createPeerConnection();
      peerConnectionRef.current = peerConnection;

      stream
        .getTracks()
        .forEach((track) => peerConnection.addTrack(track, stream));
      setCallEnabled(true);
    });

    newSocket.on("update-user-list", ({ userIds }) => {
      setUsersList(userIds.filter((id) => id !== newSocket.id));
    });

    newSocket.on("mediaOffer", handleMediaOffer); // Handle incoming offer
    newSocket.on("mediaAnswer", handleMediaAnswer);
    newSocket.on("remotePeerIceCandidate", handleRemoteIceCandidate);

    newSocket.on("callEnded", () => {
      handleRemoteEndCall(); // Handle remote call end
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const handleRemoteEndCall = () => {
    // Clean up peer connection and local stream when the remote user ends the call
    const peerConnection = peerConnectionRef.current;

    if (peerConnection) {
      peerConnection.close();
    }

    const localStream = localAudioRef.current?.srcObject;
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    // Reset states
    resetCallState();
  };

  const resetCallState = () => {
    setCallAccepted(false);
    setIncomingCall(null);
    setSelectedUser(null);
    setCallEnabled(true); // Re-enable call button
  };

  const createPeerConnection = () => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.stunprotocol.org" }],
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = (event) => {
      if (event.candidate && selectedUser) {
        socket &&
          socket.emit("iceCandidate", {
            to: selectedUser,
            candidate: event.candidate,
          });
      }
    };

    // Handle remote audio track
    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = stream;
      }
    };

    return peerConnection;
  };

  const handleMediaOffer = async (data) => {
    // When receiving a media offer, set incoming call state
    setIncomingCall(data); // Store incoming call data
    setCallEnabled(null);

    // Ensure remote description is set before creating an answer
    const peerConnection = peerConnectionRef.current;

    // Set the remote description (offer)
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.offer)
    );

    // Now create an answer and set local description
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    // Send the answer back to user 1
    socket &&
      socket.emit("mediaAnswer", {
        answer,
        from: socket.id,
        to: data.from,
      });
  };

  const handleMediaAnswer = async (data) => {
    const peerConnection = peerConnectionRef.current;
    await peerConnection.setRemoteDescription(
      new RTCSessionDescription(data.answer)
    );
  };

  const handleRemoteIceCandidate = async (data) => {
    const peerConnection = peerConnectionRef.current;
    const candidate = new RTCIceCandidate(data.candidate);
    await peerConnection.addIceCandidate(candidate);
  };

  const handleCall = async () => {
    if (!selectedUser) {
      alert("Please select a user to call!");
      return;
    }

    setCallEnabled(false);

    const peerConnection = peerConnectionRef.current;
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    socket &&
      socket.emit("mediaOffer", {
        offer,
        from: socket.id,
        to: selectedUser,
      });
  };

  const handleAcceptCall = async () => {
    if (!incomingCall) return;

    const { offer, from } = incomingCall;

    // Accept the incoming call
    setIncomingCall(null); // Clear incoming call state
    setCallAccepted(true);
    const peerConnection = peerConnectionRef.current;

    // Set the remote description (offer) from the caller
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

    // Create an answer to the offer
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

    // Send the answer back to the caller
    socket &&
      socket.emit("mediaAnswer", {
        answer,
        from: socket.id,
        to: from,
      });
  };

  const handleEndCall = () => {
    const peerConnection = peerConnectionRef.current;

    // Notify the other participant about call end
    if (socket && selectedUser) {
      socket.emit("callEnded", { to: selectedUser });
    }

    // Close the peer connection
    if (peerConnection) {
      peerConnection.close();
    }

    // Stop the local audio stream
    const localStream = localAudioRef.current?.srcObject;
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
    }

    resetCallState();

    // Reset state
    setCallAccepted(false);
    setIncomingCall(null);
    setSelectedUser(null);
    setCallEnabled(true); // Re-enable call button
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-800">Audio Call</h1>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <MDBRow className="mb-4 text-center">
            <MDBCol md={12}>
              <h2 className="mb-3">WebRTC Audio Call</h2>
              <p className="text-lg mb-4">
                User ID: <span className="font-semibold">{userId}</span>
              </p>
            </MDBCol>
          </MDBRow>

          <MDBRow className="mb-5">
            <MDBCol md={6}>
              <MDBCard className="shadow-0 border-0">
                <audio
                  ref={localAudioRef}
                  className="w-100"
                  controls
                  autoPlay
                  muted
                />
              </MDBCard>
            </MDBCol>
            <MDBCol md={6}>
              <MDBCard className="shadow-0 border-0">
                <audio
                  ref={remoteAudioRef}
                  className="w-100"
                  controls
                  autoPlay
                  
                />
              </MDBCard>
            </MDBCol>
          </MDBRow>

          {/* User List */}
          <MDBRow className="mb-5 text-center">
            <MDBCol md={12}>
              <h4>Connected Users</h4>
              {usersList.length > 0 ? (
                usersList.map((user) => (
                  <MDBBtn
                    key={user}
                    color="primary"
                    className="m-2"
                    onClick={() => setSelectedUser(user)}
                  >
                    {user}
                  </MDBBtn>
                ))
              ) : (
                <p>No users connected</p>
              )}
            </MDBCol>
          </MDBRow>

          <div className="text-center mb-6 flex justify-center">
            <button
              className={`bg-green-500 w-75 flex text-xl items-center justify-center text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-600 ${
                !callEnabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleCall}
              disabled={!callEnabled}
            >
              <Phone className="mr-2" />
              Call
            </button>
          </div>

          {incomingCall && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
                <h4 className="text-lg font-bold mb-4 text-center">
                  Incoming Call from {incomingCall?.from}
                </h4>
                <div className="flex justify-center gap-4">
                  <button
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
                    onClick={handleAcceptCall}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                    onClick={handleEndCall}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}

          {callAccepted && (
            <div className="text-center mt-4">
              <button
                className="bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600"
                onClick={handleEndCall}
              >
                End Call
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebRTCAudio;
