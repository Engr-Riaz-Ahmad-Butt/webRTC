import React, { useState, useEffect, useRef } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit"; // Updated import
import io from "socket.io-client";
import {
  Phone,
  Video,
  Mic,
  MicOff,
  VideoOff,
  MessageSquare,
  Users,
  MoreVertical,
} from "lucide-react";

const WebRTC = () => {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState("Connecting...");
  const [usersList, setUsersList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [callEnabled, setCallEnabled] = useState(false);
  const [incomingCall, setIncomingCall] = useState(null); // Incoming call state

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const toggleMute = () => setIsMuted(!isMuted);
  const toggleVideo = () => setIsVideoOn(!isVideoOn);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    newSocket.on("connect", async () => {
      setUserId(newSocket.id);

      // Constraints for both audio and video
      const constraints = { audio: true, video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      // Set local video stream
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
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

    return () => {
      newSocket.disconnect();
    };
  }, []);

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

    // Handle remote video/audio track
    peerConnection.ontrack = (event) => {
      const [stream] = event.streams;
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = stream;
      }
    };

    return peerConnection;
  };

  const handleMediaOffer = async (data) => {
    // When receiving a media offer, set incoming call state
    setIncomingCall(data); // Store incoming call data

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

  const handleRejectCall = () => {
    setIncomingCall(null); // Reject the call and clear incoming call data
  };

  const handleHangUp = () => {
    // Close the peer connection
    if (peerConnectionRef.current) {
      peerConnectionRef.current.close();
    }

    // Stop the local media tracks (camera/microphone)
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      const stream = localVideoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
    }

    // Emit "hangUp" event to notify the other user
    socket &&
      socket.emit("hangUp", {
        from: socket.id,
        to: selectedUser,
      });

    // Clear the selected user and other call-related states
    setSelectedUser(null);
    setCallEnabled(false);
    setIsMuted(false);
    setIsVideoOn(true);
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <MDBContainer>
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold text-gray-800">Video Call</h1>
          <p className="text-muted">
            User ID: <strong>{userId}</strong>
          </p>
        </header>

        {/* Video Streams */}
        {/* <MDBRow className="mb-5">
          <MDBCol md={6}>
            <MDBCard className="shadow-0 border-0">
              <video ref={localVideoRef} className="w-100 rounded" playsInline autoPlay muted />
            </MDBCard>
          </MDBCol>
          <MDBCol md={6}>
            <MDBCard className="shadow-0 border-0">
              <video ref={remoteVideoRef} className="w-100 rounded" playsInline autoPlay />
            </MDBCard>
          </MDBCol>
        </MDBRow> */}

        <div className="flex-1 flex flex-col p-4 space-y-4">
          <div className="flex flex-row space-x-4">
            <div className="flex-1 bg-gray-800 rounded overflow-hidden">
              <video
                ref={localVideoRef}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
                muted
              />
            </div>
            <div className="flex-1 bg-gray-800 rounded overflow-hidden">
              <video
                ref={remoteVideoRef}
                className="w-full h-full object-cover"
                playsInline
                autoPlay
              />
            </div>
          </div>

          {/* Call controls */}
          <div className="mt-4 flex justify-center space-x-4">
            <button
              className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
              onClick={handleHangUp}
            >
              <Phone className="h-10 w-10" />
            </button>
          </div>
        </div>

        {/* User List */}
        {/* <MDBRow className="mb-5 text-center">
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
        </MDBRow> */}

        {/* Call Button */}
        {/* <MDBRow className="mb-4 text-center">
          <MDBCol md={12}>
            <MDBBtn
              color="success"
              size="lg"
              onClick={handleCall}
              disabled={!callEnabled}
            >
              Call
            </MDBBtn>
          </MDBCol>
        </MDBRow> */}

        {/* Incoming Call UI */}
        {/* {incomingCall && (
          <MDBRow className="text-center">
            <MDBCol md={12}>
              <h4>Incoming Call from {incomingCall?.from}</h4>
              <MDBBtn color="success" className="mx-2" onClick={handleAcceptCall}>Accept</MDBBtn>
              <MDBBtn color="danger" className="mx-2" onClick={handleRejectCall}>Reject</MDBBtn>
            </MDBCol>
          </MDBRow>
        )} */}

        <div className="p-4">
          <div className="mb-5 text-center">
            <h4 className="text-lg font-semibold">Connected Users</h4>
            {usersList.length > 0 ? (
              usersList.map((user) => (
                <button
                  key={user}
                  className="bg-blue-500 text-white py-2 px-4 rounded m-2"
                  onClick={() => setSelectedUser(user)}
                >
                  {user}
                </button>
              ))
            ) : (
              <p className="text-gray-500">No users connected</p>
            )}
          </div>

          {/* Call Button */}
          <div className="mb-4 text-center">
            <button
              className={`py-2 px-4 rounded text-lg ${
                callEnabled
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
              onClick={handleCall}
              disabled={!callEnabled}
            >
              Call
            </button>
          </div>

          {/* Incoming Call UI */}
          {incomingCall && (
            // <div className="text-center">
            //   <h4 className="text-lg font-semibold">
            //     Incoming Call from {incomingCall?.from}
            //   </h4>
            //   <div className="flex justify-center space-x-4 mt-2">
            //     <button
            //       className="bg-green-500 text-white py-2 px-4 rounded"
            //       onClick={handleAcceptCall}
            //     >
            //       Accept
            //     </button>
            //     <button
            //       className="bg-red-500 text-white py-2 px-4 rounded"
            //       onClick={handleRejectCall}
            //     >
            //       Reject
            //     </button>
            //   </div>
            // </div>

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
                    onClick={handleRejectCall}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MDBContainer>
    </div>
  );
};

export default WebRTC;
