'use client';
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Providers } from "./providers"; // importa el SessionProvider

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showAppBar = pathname !== "/login";

  return (
    <html lang="es">
      <body>
        <Providers> {/* <--- Aquí envolvemos toda la app */}
          {showAppBar && (
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Mi Aplicación
                </Typography>
                <Button color="inherit" onClick={() => window.location.href = "/inicio"}>
                  Inicio
                </Button>
                <Button color="inherit" onClick={() => signOut({ callbackUrl: "/login" })}>
                  Cerrar sesión
                </Button>
              </Toolbar>
            </AppBar>
          )}
          <Box sx={{ padding: 2 }}>
            {children}
          </Box>
        </Providers>
      </body>
    </html>
  );
}
