'use client';
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor selecciona un archivo PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:5136/api/pdf/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const result = await response.json();
      setUploadResult(`Archivo subido con éxito. ID: ${result.id}`);
    } else {
      setUploadResult("Error al subir el archivo.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Subir PDF</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Subir</button>
      </form>
      {uploadResult && <p>{uploadResult}</p>}
    </div>
  );
}
