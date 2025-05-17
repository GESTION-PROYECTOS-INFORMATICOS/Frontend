'use client';
import React, { useEffect, useState } from "react";
import { Container, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function Informatica() {
  const [mallas, setMallas] = useState([]);
  const [mallaSeleccionada, setMallaSeleccionada] = useState("");
  const [semestresDisponibles, setSemestresDisponibles] = useState([]);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState("");
  const [asignaturas, setAsignaturas] = useState([]);
  const [asignaturaSeleccionada, setAsignaturaSeleccionada] = useState("");

  // Cargar mallas al iniciar
  useEffect(() => {
    const fetchMallas = async () => {
      try {
        const response = await fetch("http://localhost:5136/api/malla");
        const data = await response.json();
        setMallas(data.mallas || data); // Por si la API devuelve un array directo
      } catch (error) {
        console.error("Error al obtener mallas:", error);
      }
    };

    fetchMallas();
  }, []);

  // Actualizar semestres según la malla seleccionada
  useEffect(() => {
    if (mallaSeleccionada) {
      const malla = mallas.find(m => m.id === mallaSeleccionada);
      if (malla && malla.cantidadSemestres) {
        const semestres = Array.from({ length: malla.cantidadSemestres }, (_, i) => i + 1);
        setSemestresDisponibles(semestres);
      } else {
        setSemestresDisponibles([]);
      }
      // Limpiar selecciones dependientes
      setSemestreSeleccionado("");
      setAsignaturaSeleccionada("");
      setAsignaturas([]);
    }
  }, [mallaSeleccionada, mallas]);

  // Cargar asignaturas según malla y semestre
  useEffect(() => {
    const fetchAsignaturas = async () => {
      if (mallaSeleccionada && semestreSeleccionado) {
        try {
          const response = await fetch(
            `http://localhost:5136/api/asignatura?malla_id=${mallaSeleccionada}&semestre=${semestreSeleccionado}`
          );
          const data = await response.json();
          setAsignaturas(data.asignaturas || data);
        } catch (error) {
          console.error("Error al obtener asignaturas:", error);
        }
      }
    };

    fetchAsignaturas();
  }, [mallaSeleccionada, semestreSeleccionado]);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>Selecciona Malla, Semestre y Asignatura</Typography>

      {/* Malla */}
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Malla</InputLabel>
        <Select
          value={mallaSeleccionada}
          label="Malla"
          onChange={(e) => setMallaSeleccionada(e.target.value)}
        >
          {mallas.map((malla) => (
            <MenuItem key={malla.id} value={malla.id}>
              {malla.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Semestre */}
      {mallaSeleccionada && semestresDisponibles.length > 0 && (
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Semestre</InputLabel>
          <Select
            value={semestreSeleccionado}
            label="Semestre"
            onChange={(e) => setSemestreSeleccionado(e.target.value)}
          >
            {semestresDisponibles.map((sem) => (
              <MenuItem key={sem} value={sem}>
                Semestre {sem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Asignatura */}
      {semestreSeleccionado && asignaturas.length > 0 && (
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
    </Container>
  );
}
