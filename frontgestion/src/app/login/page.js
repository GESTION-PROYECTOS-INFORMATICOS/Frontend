"use client";
import { signIn } from "next-auth/react";
import { Box, Button, Typography, Paper } from "@mui/material";
import MicrosoftIcon from '@mui/icons-material/Microsoft';

export default function LoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0b2545 0%, #1e3c72 100%)",
        padding: 2,
      }}
    >
        <Paper
          elevation={6}
          sx={{
            paddingTop: 8,
            paddingX: 5,
            paddingBottom: 5,
            borderRadius: 3,
            textAlign: "center",
            maxWidth: 600,
            width: "95%",
            border: "2px solid white",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#0b2545",
              fontFamily: "'Segoe UI', 'Roboto', 'Helvetica', sans-serif",
              fontWeight: "bold",
              letterSpacing: "0.5px",
            }}
          >
            Bienvenido a la plataforma de modificación de plan de asignaturas
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#1e3c72",
              fontWeight: 500,
              marginBottom: 3,
            }}
          >
            Inicia sesión con tu cuenta institucional
          </Typography>

          <Button
            variant="contained"
            color="#0b2545"
            startIcon={<MicrosoftIcon />}
            sx={{
              mt: 2,
              backgroundColor: "transparent",
              border: "2px solid #0b2545",
              color: "#0b2545",
              '&:hover': {
                backgroundColor: "#0b2545",
                color: "white"
              },
              borderRadius: 2,
              paddingX: 3,
              paddingY: 1.5,
              fontSize: "1rem",
            }}
            onClick={() =>
              signIn("azure-ad", { callbackUrl: "http://localhost:3000/inicio" })
            }
          >
            Iniciar como miembro del comité
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<MicrosoftIcon />}
            sx={{
              mt: 2,
              backgroundColor: "transparent",
              border: "2px solid #0b2545",
              color: "#0b2545",
              '&:hover': {
                backgroundColor: "#0b2545",
                color: "white"
              },
              borderRadius: 2,
              paddingX: 3,
              paddingY: 1.5,
              fontSize: "1rem",
            }}
            onClick={() =>
              signIn("azure-ad", { callbackUrl: "http://localhost:3000/coordinador" })
            }
          >
            Iniciar como coordinador del comité
          </Button>
        </Paper>
      </Box>
  );
}
