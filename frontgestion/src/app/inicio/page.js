'use client';
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
    // { 
    //   nombre: "Ingresar solicitud", 
    //   ruta: "/inicio/solicitud", 
    //   icon: <AddCircleOutlineIcon sx={{ fontSize: 70, color: "#1976d2" }} /> 
    // },
    { 
      nombre: "Realizar solicitud", 
      ruta: "/inicio/subir_doc", 
      icon: <DescriptionIcon sx={{ fontSize: 70, color: "#388e3c" }} /> 
    },
     {
  nombre: "Filtrar programas",
  ruta: "/inicio/filtrar_P",
  icon: <SearchIcon sx={{ fontSize: 70, color: "#1976d2" }} />
}
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Typography 
        variant="h4" 
        align="center" 
        gutterBottom 
        fontWeight="bold"
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
                background: "linear-gradient(135deg, #f9f9f9 0%, #f1f1f1 100%)",
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
