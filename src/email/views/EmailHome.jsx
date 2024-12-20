import React, { useRef } from "react";
import EmailEditor from "react-email-editor";


export const EmailHome = () => {
    
    const editorRef = useRef(null);

    const exportHtml = () => {
      editorRef.current.exportHtml((data) => {
        const { html } = data;
        console.log("HTML generado:", html);
      });
    };
  
    return (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, position: "relative" }}>
          <EmailEditor
            ref={editorRef}
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
            }}
          />
        </div>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <button onClick={exportHtml} style={{ padding: "10px 20px", fontSize: "16px" }}>
            Exportar HTML
          </button>
        </div>
      </div>
    );

}
