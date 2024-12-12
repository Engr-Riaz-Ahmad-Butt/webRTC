import React from "react";
import { Link } from "react-router-dom";
import { Phone, Video } from "lucide-react";
const CallCenter = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200">
      <h1 className="text-4xl font-bold mb-8 text-blue-800">Welcome to Call Center</h1>
      <div className="flex space-x-4">
        <Link to="/audio-call" className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          <Phone className="mr-2" />
          Audio Call
        </Link>
        <Link to="/video-call" className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          <Video className="mr-2" />
          Video Call
        </Link>
      </div>
    </div>
    </>
  );
};

export default CallCenter;
