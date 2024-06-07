import React from "react";

function ThankYou() {
  const handleRedirect = () => {
    window.location.href = "/tourist";
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Thank You!</h1>
        <p className="text-gray-600 mb-6">payment is done successfully</p>
        <button
          onClick={handleRedirect}
          className="bg-green-950 hover:bg-green-900 text-white font-semibold py-2 px-4 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default ThankYou;
