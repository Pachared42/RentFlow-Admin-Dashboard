"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const theme = createTheme({
    palette: {
        mode: "light",
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
    },
    typography: {
        fontFamily: "var(--font-thai), var(--font-latin), system-ui, sans-serif",
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: "#ffffff",
                    fontFamily:
                        "var(--font-thai), var(--font-latin), system-ui, sans-serif",
                },
            },
        },
    },
});

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider options={{ key: "mui" }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}