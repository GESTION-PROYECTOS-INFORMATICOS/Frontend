"use client";
import { useEffect, useState } from "react";
import { fetchRequests, approveRequest, rejectRequest } from "../../../services/apiService";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Box,
  Paper,
  Chip,
  Link
} from "@mui/material";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

export default function CoordinadorPage() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const data = await fetchRequests();
      setRequests(data);
    } catch (err) {
      console.error("Error al cargar solicitudes:", err.message);
    }
  };

  const handleApprove = async (id) => {
    await approveRequest(id);
    await loadRequests();
  };

  const handleReject = async (id) => {
    await rejectRequest(id);
    await loadRequests();
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const renderStatusChip = (status) => {
    switch (status) {
      case "Pending":
        return <Chip label="Pendiente" color="warning" variant="outlined" />;
      case "Approved":
        return <Chip label="Aprobado" color="success" />;
      case "Rejected":
        return <Chip label="Rechazado" color="error" />;
      default:
        return <Chip label={status} />;
    }
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ color: "#0b2545" }}>
        <center>Solicitudes de modificación</center>
      </Typography>

      <Paper elevation={4} sx={{ borderRadius: 3, overflow: "hidden" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#0b2545" }}>
            <TableRow>
              <TableCell sx={{ color: "white" }}>Documento</TableCell>
              <TableCell sx={{ color: "white" }}>Motivo</TableCell>
              <TableCell sx={{ color: "white" }}>Solicitado por</TableCell>
              <TableCell sx={{ color: "white" }}>Estado</TableCell>
              <TableCell sx={{ color: "white" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((req) => (
              <TableRow key={req.id} hover>
                <TableCell>
                  <Link
                    href={`http://localhost:5136/api/pdf/${req.documentId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    underline="hover"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <PictureAsPdfIcon sx={{ color: "#e53935" }} />
                    {req.documentId.slice(0, 6)}...{req.documentId.slice(-6)}
                  </Link>
                </TableCell>
                <TableCell>{req.requestReason}</TableCell>
                <TableCell>{req.requestedBy}</TableCell>
                <TableCell>{renderStatusChip(req.status)}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(req.id)}
                      disabled={req.status !== "Pending"}
                    >
                      Aprobar
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(req.id)}
                      disabled={req.status !== "Pending"}
                    >
                      Rechazar
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
