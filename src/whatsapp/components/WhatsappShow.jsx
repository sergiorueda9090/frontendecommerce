import React, { useState } from "react";
import { Card, CardContent, Typography, Paper, Box, Button } from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import PhoneIcon from "@mui/icons-material/Phone";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import whatsappimg from "../../assets/img/whatsapp/whatsappimg.png";

export const WhatsappShow = () => {

       const [header, setHeader] = useState("Title"); // Encabezado opcional
       const [body, setBody] = useState("Body content"); // Mensaje principal
       const [footer, setFooter] = useState("footer"); // Pie de página opcional
       const [buttons, setButtons] = useState([
           { type: "url", label: "Ir al sitio web", action: "https://example.com" },
           { type: "phone", label: "Llamar ahora", action: "+1234567890" },
           { type: "copy", label: "Copiar código", action: "OFERTA123" },
         ]);

        // Función para manejar botones interactivos
  const handleButtonClick = (button) => {
    if (button.type === "url") {
      window.open(button.action, "_blank"); // Abre URL en una nueva pestaña
    } else if (button.type === "phone") {
      window.location.href = `tel:${button.action}`; // Inicia llamada
    } else if (button.type === "copy") {
      navigator.clipboard.writeText(button.action); // Copia al portapapeles
      alert("Código copiado: " + button.action);
    }
  };
    return (
      <Card
      sx={{
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "#e5ddd5",
        backgroundImage: `url(${whatsappimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <CardContent>
        {/* Simulación del Encabezado */}
        {header && (
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              backgroundColor: "#075e54",
              color: "#fff",
              padding: "8px",
              borderRadius: "4px",
              marginBottom: "8px",
            }}
          >
            {header}
          </Typography>
        )}

        {/* Simulación del Mensaje Principal */}
        <Paper
          elevation={1}
          sx={{
            padding: "10px",
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            marginBottom: "8px",
          }}
        >
          <Typography variant="body1" sx={{ color: "#000" }}>
            {body || "Escribe tu mensaje aquí..."}
          </Typography>
        </Paper>

        {/* Simulación del Footer */}
        {footer && (
          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "center",
              color: "#777",
              marginTop: "8px",
            }}
          >
            {footer}
          </Typography>
        )}

        {/* Botones */}
        <Box sx={{ display: "flex", gap: 1, marginTop: 2, flexDirection: "column" }}>
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={() => handleButtonClick(button)}
              sx={{
                border: "1px solid #075e54",
                color: "#075e54",
                backgroundColor: "#ffffff",
                borderRadius: "20px",
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e0f2f1",
                },
              }}
              startIcon={
                button.type === "url" ? (
                  <LanguageIcon />
                ) : button.type === "phone" ? (
                  <PhoneIcon />
                ) : (
                  <ContentCopyIcon />
                )
              }
            >
              {button.label}
            </Button>
          ))}
        </Box>
      </CardContent>
    </Card>
    );
  };