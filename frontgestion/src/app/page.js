'use client'
import Head from 'next/head'
import { Button, Container, Typography, Box } from '@mui/material'

export default function Home() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3000/login'; 
  };

  return (
    <>
      <Head>
        <title>Página de Inicio</title>
      </Head>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          color: '#fff',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom>
          Bienvenido
        </Typography>
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogin}
            sx={{
              paddingX: 4,
              paddingY: 1.5,
              fontSize: '1.1rem',
              borderRadius: '8px',
              backgroundColor: '#ffffff',
              color: '#764ba2',
              '&:hover': {
                backgroundColor: '#eeeeee',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </>
  );
}
