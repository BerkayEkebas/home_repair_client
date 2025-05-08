import React from "react";

const LoadingDuyurular = () => {

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgb(16, 95, 10)", // Opak bir siyah arka plan
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // En önde durması için yüksek bir z-index değeri
      }}
    >
      <img
        src={`https://cdn.imweb.me/thumbnail/20241114/974b51e91d3aa.png`}
        alt="Blinking Icon"
        style={{
          width: "300px", // Görüntünün boyutunu ayarlayın
          animation: "blink 2s infinite",
        }}
      />
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingDuyurular;
