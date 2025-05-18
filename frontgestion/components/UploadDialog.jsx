import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Input, Alert } from "@mui/material";
import { useState } from "react";
import { uploadDocumento } from "../services/apiService";

export default function UploadDialog({ open, onClose }) {
  const [file, setFile] = useState(null);
  const [uploadResult, setUploadResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Por favor selecciona un archivo PDF.");

    try {
      const result = await uploadDocumento(file);
      setUploadResult(`Archivo subido con éxito. ID: ${result.id}`);
    } catch (err) {
      setUploadResult("Error al subir el archivo.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Subir Documento</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Input
              type="file"
              inputProps={{ accept: "application/pdf" }}
              onChange={(e) => setFile(e.target.files[0])}
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" disabled={!file}>
              Subir
            </Button>
          </Stack>
        </form>
        {uploadResult && (
          <Alert severity={uploadResult.includes("éxito") ? "success" : "error"} sx={{ mt: 3 }}>
            {uploadResult}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
