
'use client';
import React, { useEffect, useState } from "react";
import { Container, Typography, List, ListItem, ListItemText, Divider, CircularProgress, Alert } from "@mui/material";
import { fetchPdfs } from "../../../../services/apiService";
import PdfListItem from "./pdfListItem"; 

export default function ListadoArchivos() {
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPdfs()
      .then(data => {
        setPdfs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || "Error desconocido");
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <Container sx={{ mt: 4, textAlign: "center" }}>
      <CircularProgress />
      <Typography>Cargando archivos...</Typography>
    </Container>
  );

  if (error) return (
    <Container sx={{ mt: 4 }}>
      <Alert severity="error">{error}</Alert>
    </Container>
  );

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Listado de Archivos PDF</Typography>
      {pdfs.length === 0 ? (
        <Typography>No hay archivos para mostrar.</Typography>
      ) : (
          <List>
        {pdfs.map((pdf) => (
    <PdfListItem key={pdf.id || pdf._id} pdf={pdf} />
  ))}
      </List>



      )}
    </Container>
  );
}

