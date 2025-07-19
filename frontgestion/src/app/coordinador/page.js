'use client';
import { useEffect, useState } from "react";
import { fetchRequests, approveRequest, rejectRequest } from "../../../services/apiService";
import { Container, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack } from "@mui/material";

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

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>SOLICITUDES</Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Documento</TableCell>
            <TableCell>Motivo</TableCell>
            <TableCell>Solicitado por</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell>
              <a
                href={`http://localhost:5136/api/pdf/${req.documentId}`}
                target="_blank"
                rel="noopener noreferrer"
                download
                style={{ textDecoration: 'underline', color: 'blue' }}
              >
                {req.documentId}
              </a>
            </TableCell>

              <TableCell>{req.requestReason}</TableCell>
              <TableCell>{req.requestedBy}</TableCell>
              <TableCell>{req.status}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button variant="contained" color="success" onClick={() => handleApprove(req.id)} disabled={req.status !== "Pending"}>
                    Aprobar
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleReject(req.id)} disabled={req.status !== "Pending"}>
                    Rechazar
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}
