import React from "react";
import { 
  ListItem, 
  ListItemAvatar, 
  Avatar, 
  ListItemText, 
  Typography, 
  Box, 
  Button 
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FolderIcon from "@mui/icons-material/Folder";

export default function PdfListItem({ pdf }) {
  const fecha = pdf.FechaSubida || pdf.fechaSubida ? new Date(pdf.FechaSubida || pdf.fechaSubida) : null;
  const fechaValida = fecha && !isNaN(fecha.getTime());

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:5136/api/pdf/${pdf._id || pdf.Id || pdf.id}`);
      if (!response.ok) throw new Error("Error al descargar archivo");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = pdf.FileName || pdf.fileName || "archivo.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ListItem 
      alignItems="flex-start" 
      sx={{ bgcolor: "#f5f5f5", borderRadius: 2, mb: 1, boxShadow: 1, display: "flex", justifyContent: "space-between" }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: "#1976d2" }}>
          <DescriptionIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="h6" component="span" color="primary" fontWeight="bold">
            {pdf.FileName || pdf.fileName}
          </Typography>
        }
        secondary={
          <Box sx={{ mt: 0.5 }}>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <strong>Tipo:</strong> {pdf.ContentType || pdf.contentType}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <FolderIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
              <strong>Malla:</strong> {pdf.Malla || pdf.malla || "No disponible"}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              <FolderIcon fontSize="small" sx={{ verticalAlign: "middle", mr: 0.5 }} />
              <strong>Asignatura:</strong> {pdf.Asignatura || pdf.asignatura || "No disponible"}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ display: "flex", alignItems: "center" }}>
              <CalendarTodayIcon fontSize="small" sx={{ mr: 0.5 }} />
              <strong>Fecha subida:</strong> {fechaValida ? fecha.toLocaleString() : "No disponible"}
            </Typography>
          </Box>
        }
      />
      <Button variant="outlined" size="small" onClick={handleDownload} sx={{ alignSelf: "center" }}>
        Descargar
      </Button>
    </ListItem>
  );
}
