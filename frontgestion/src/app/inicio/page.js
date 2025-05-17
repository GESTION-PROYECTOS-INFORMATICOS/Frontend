'use client';
import React from "react";
import { useRouter } from "next/navigation";
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
    { nombre: "Ingresar solicitud", ruta: "/inicio/solicitud", icon: <AddCircleOutlineIcon sx={{ fontSize: 60, color: "#1976d2" }} /> },
    { nombre: "Subir documento existente", ruta: "/inicio/subir_doc", icon: <DescriptionIcon sx={{ fontSize: 60, color: "#388e3c" }} /> },
  ];

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        ¿Qué desea hacer?
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {opciones.map((opcion, index) => (
          <Grid item xs={12} sm={6} md={6} key={index}>
            <Card 
              sx={{ 
                height: 250, 
                borderRadius: 3, 
                boxShadow: 4, 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                transition: "transform 0.2s", 
                "&:hover": { transform: "scale(1.05)" } 
              }}
            >
              <CardActionArea 
                onClick={() => router.push(opcion.ruta)} 
                sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", p: 3 }}
              >
                <Box mb={2}>
                  {opcion.icon}
                </Box>
                <CardContent>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    align="center" 
                    fontWeight="medium"
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
