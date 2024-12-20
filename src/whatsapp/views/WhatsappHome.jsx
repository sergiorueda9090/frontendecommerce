import React, { useState } from "react";
import whatsappimg from "../../assets/img/whatsapp/whatsappimg.png";

export const WhatsappHome = () => {
  // Lista de colores predefinidos
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#8E44AD",
    "#1ABC9C", "#E74C3C", "#34495E", "#D35400", "#7D3C98",
    "#16A085", "#C0392B", "#2C3E50", "#F39C12", "#27AE60",
  ];

  // Estado para el color seleccionado
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
    <div>
      {/* Imagen con el color seleccionado como fondo */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          style={{
            background: selectedColor,
            height: "90vh",
          }}
          src={whatsappimg}
          alt="Whatsapp"
        />
        <h2 style={{ color: "#fff" }}>Sergio</h2>
      </div>

      {/* Selector de colores */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "5px",
          gap: "5px",
          flexWrap: "wrap",
          padding: "5px",
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => setSelectedColor(color)} // Cambiar color al hacer clic
            style={{
              backgroundColor: color,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              cursor: "pointer",
              border: selectedColor === color ? "3px solid #000" : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
};
