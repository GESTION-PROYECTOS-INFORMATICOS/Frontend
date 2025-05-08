'use client';
import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Input,
  Alert,
  Stack,
} from "@mui/material";

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

    try {
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
    } catch (err) {
      setUploadResult("Ocurrió un error de red al subir el archivo.");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        <Typography variant="h4" gutterBottom color="text.primary">
          Subir malla curricular
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Input
              type="file"
              inputProps={{ accept: "application/pdf" }}
              onChange={(e) => setFile(e.target.files[0])}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!file}
            >
              Subir
            </Button>
          </Stack>
        </form>

        {uploadResult && (
          <Alert severity={uploadResult.includes("éxito") ? "success" : "error"} sx={{ mt: 3 }}>
            {uploadResult}
          </Alert>
        )}
      </Box>
    </Container>
  );
}
