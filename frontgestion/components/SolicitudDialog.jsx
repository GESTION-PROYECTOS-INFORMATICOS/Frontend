'use client';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack, Input, TextField, Alert } from "@mui/material";
import { useState } from "react";
import { realizarSolicitud } from "../services/apiService";

export default function SolicitudDialog({ open, onClose, mallaSeleccionada, asignaturaSeleccionada }) {
  const [file, setFile] = useState(null);
  const [requestReason, setRequestReason] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !requestReason || !requestedBy) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await realizarSolicitud(file, requestReason, requestedBy);
      setResult(response.message);
    } catch (err) {
      setResult("Error: " + err.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Realizar Solicitud</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Input
              type="file"
              inputProps={{ accept: "application/pdf" }}
              onChange={(e) => setFile(e.target.files[0])}
              fullWidth
            />
            <TextField
              label="Motivo de la solicitud"
              value={requestReason}
              onChange={(e) => setRequestReason(e.target.value)}
              fullWidth
            />
            <TextField
              label="Solicitado por"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={!file}>
              Enviar Solicitud
            </Button>
            {result && (
              <Alert severity={result.includes("correctamente") ? "success" : "error"}>
                {result}
              </Alert>
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}
