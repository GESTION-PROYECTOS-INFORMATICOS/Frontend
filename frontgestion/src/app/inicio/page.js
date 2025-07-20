"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SearchIcon from '@mui/icons-material/Search';

import { 
  Card, 
  CardContent, 
  Typography, 
  CardActionArea, 
  Grid, 
  Container, 
  Box 
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Inicio() {
  const router = useRouter();

  const opciones = [
    {
      nombre: "Realizar solicitud de modificación",
      ruta: "/inicio/subir_doc",
      icon: <DescriptionIcon sx={{ fontSize: 70, color: "white" }} />
    },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        fontWeight="bold"
        sx={{ color: "#0b2545" }}
      >
        ¿Qué desea hacer?
      </Typography>

      <Grid container spacing={5} justifyContent="center">
        {opciones.map((opcion, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card 
              sx={{ 
                height: 270, 
                borderRadius: 4, 
                boxShadow: 6, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                background: "linear-gradient(135deg, #0b2545 0%, #1e3c72 100%)",
                transition: "all 0.3s ease-in-out", 
                "&:hover": { 
                  transform: "translateY(-8px) scale(1.03)", 
                  boxShadow: 10 
                } 
              }}
            >
              <CardActionArea 
                onClick={() => router.push(opcion.ruta)} 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  p: 4 
                }}
              >
                <Box mb={2}>
                  {opcion.icon}
                </Box>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    align="center" 
                    fontWeight={600}
                    sx={{ color: "white" }}
                  >
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
