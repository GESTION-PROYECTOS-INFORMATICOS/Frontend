'use client';
import React, { useEffect, useState } from "react";
import { Container, Typography, MenuItem, Select, FormControl, InputLabel, Button, Stack } from "@mui/material";
import UploadDialog from "../../../../../components/UploadDialog";
import { fetchMallas, fetchAsignaturas } from "../../../../../services/apiService";

export default function Informatica() {
  const [mallas, setMallas] = useState([]);
  const [mallaSeleccionada, setMallaSeleccionada] = useState("");
  const [semestresDisponibles, setSemestresDisponibles] = useState([]);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState(0);
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOtroBoton1 = () => {
  console.log('Otro Botón 1 clickeado');
    };

    const handleOtroBoton2 = () => {
      console.log('Otro Botón 2 clickeado');
    };


  useEffect(() => {
    fetchMallas()
      .then(data => setMallas(data.mallas || data))
      .catch(err => console.error("Error al obtener mallas:", err));
  }, []);

  useEffect(() => {
    if (mallaSeleccionada) {
      const malla = mallas.find(m => m.id === mallaSeleccionada);
      const semestres = malla?.cantidadSemestres
        ? Array.from({ length: malla.cantidadSemestres }, (_, i) => i + 1)
        : [];
      setSemestresDisponibles(semestres);
      setSemestreSeleccionado(0);
      setAsignaturaSeleccionada("");
      setAsignaturas([]);
    }
  }, [mallaSeleccionada, mallas]);

  useEffect(() => {
    if (mallaSeleccionada && semestreSeleccionado !== 0) {
      fetchAsignaturas(mallaSeleccionada, semestreSeleccionado)
        .then(data => setAsignaturas(data.asignaturas || data))
        .catch(err => console.error("Error al obtener asignaturas:", err));
    }
  }, [mallaSeleccionada, semestreSeleccionado]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Selecciona Malla, Semestre y Asignatura</Typography>

      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Malla</InputLabel>
        <Select value={mallaSeleccionada} label="Malla" onChange={(e) => setMallaSeleccionada(e.target.value)}>
          {mallas.map((malla) => (
            <MenuItem key={malla.id} value={malla.id}>
              {malla.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {mallaSeleccionada && semestresDisponibles.length > 0 && (
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Semestre</InputLabel>
          <Select
            value={semestreSeleccionado}
            label="Semestre"
            onChange={(e) => setSemestreSeleccionado(Number(e.target.value))}
          >
            {semestresDisponibles.map((sem) => (
              <MenuItem key={sem} value={sem}>
                Semestre {sem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {semestreSeleccionado !== 0 && asignaturas.length > 0 && (
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Asignatura</InputLabel>
          <Select
            value={asignaturaSeleccionada}
            label="Asignatura"
            onChange={(e) => setAsignaturaSeleccionada(e.target.value)}
          >
            {asignaturas.map((asig) => (
              <MenuItem key={asig.id} value={asig.id}>
                {asig.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {mallaSeleccionada && semestreSeleccionado !== 0 && asignaturaSeleccionada && (
      <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
          Subir documento existente 
        </Button>
        <Button variant="contained" color="secondary" onClick={handleOtroBoton1}>
          Realizar solicitud
        </Button>
        <Button variant="contained" color="success" onClick={handleOtroBoton2}>
          Arbol de versiones
        </Button>
      </Stack>
    )}

      <UploadDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Container>
  );
}
