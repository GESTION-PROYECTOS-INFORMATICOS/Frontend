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
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          borderRadius: 3,
          textAlign: "center",
          maxWidth: 400,
          width: "90%",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Inicia Sesión
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<MicrosoftIcon/>}
          sx={{
            mt: 2,
            bgcolor: "#1976d2",
            color: "white",
            '&:hover': { bgcolor: "#115293" },
            borderRadius: 2,
            paddingX: 3,
            paddingY: 1.5,
            fontSize: "1rem",
          }}
          onClick={() =>
            signIn("azure-ad", { callbackUrl: "http://localhost:3000/inicio" })
          }
        >
          Iniciar sesión con Microsoft
        </Button>
      </Paper>
    </Box>
  );
}
