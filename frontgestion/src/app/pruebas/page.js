'use client';
import React, { useEffect, useState } from "react";
import { Container, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

export default function Pruebas() {
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
        setMallas(data.mallas);
      } catch (error) {
        console.error("Error al obtener mallas:", error);
      }
    };

    fetchMallas();
  }, []);

  // Cargar semestres cuando se selecciona una malla
  useEffect(() => {
    if (mallaSeleccionada) {
      // Simula los semestres disponibles (esto podrías hacerlo con una API también)
      setSemestresDisponibles([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    }
  }, [mallaSeleccionada]);

  // Cargar asignaturas cuando se selecciona un semestre
  useEffect(() => {
    const fetchAsignaturas = async () => {
      if (mallaSeleccionada && semestreSeleccionado) {
        try {
          const response = await fetch(
            `http://localhost:5136/api/asignatura?malla_id=${mallaSeleccionada}&semestre=${semestreSeleccionado}`
          );
          const data = await response.json();
          setAsignaturas(data || []);
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

      {/* MALLA */}
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel>Malla</InputLabel>
        <Select
          value={mallaSeleccionada}
          label="Malla"
          onChange={(e) => {
            setMallaSeleccionada(e.target.value);
            setSemestreSeleccionado(""); // Resetear dependencias
            setAsignaturaSeleccionada("");
          }}
        >
          {mallas.map((malla) => (
            <MenuItem key={malla.id} value={malla.id}>
              {malla.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* SEMESTRE */}
      {mallaSeleccionada && (
        <FormControl fullWidth sx={{ mt: 3 }}>
          <InputLabel>Semestre</InputLabel>
          <Select
            value={semestreSeleccionado}
            label="Semestre"
            onChange={(e) => {
              setSemestreSeleccionado(e.target.value);
              setAsignaturaSeleccionada("");
            }}
          >
            {semestresDisponibles.map((sem) => (
              <MenuItem key={sem} value={sem}>
                Semestre {sem}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* ASIGNATURA */}
      {semestreSeleccionado && (
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
