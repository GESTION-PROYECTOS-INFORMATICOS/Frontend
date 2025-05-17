'use client';
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, Typography, CardActionArea, Grid, Container } from "@mui/material";

export default function Subir_Doc() {
  const router = useRouter();

  // Mapeo de carreras a sus rutas
  const opciones = [
    { nombre: "Ingeniería civil informática", ruta: "/inicio/subir_doc/informatica" },
    { nombre: "Campus san felipe", ruta: "/inicio/subir_doc/san_felipe" },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Seleccione una carrera
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {opciones.map((opcion, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ minWidth: 275, borderRadius: 2, boxShadow: 3 }}>
              <CardActionArea onClick={() => router.push(opcion.ruta)}>
                <CardContent>
                  <Typography variant="h5" component="div" gutterBottom>
                    {opcion.nombre}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
