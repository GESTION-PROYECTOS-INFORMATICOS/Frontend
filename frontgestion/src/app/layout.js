"use client";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showAppBar = pathname !== "/login";

  return (
    <html lang="es">
      <body>
        <Providers>
          {showAppBar && (
            <AppBar
              position="static"
              sx={{
                background: "linear-gradient(135deg, #0b2545 0%, #1e3c72 100%)",
              }}
            >
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Universidad de Valparaíso - GPI
                </Typography>
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
