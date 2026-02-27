"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Divider,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";

const TOKEN_COOKIE = "rf_token";

const pillFieldSX = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "white",

        "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: "12px",
            borderColor: "rgb(226 232 240)",
        },

        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(203 213 225)",
        },

        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgb(15 23 42)",
        },

        "& .MuiOutlinedInput-input": {
            padding: "14px 16px",
            fontWeight: 600,
        },
    },

    "& input:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 100px white inset",
        WebkitTextFillColor: "inherit",
        caretColor: "inherit",
        transition: "background-color 9999s ease-out 0s",
    },
};

function isEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export default function Login() {
    const router = useRouter();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [showPw, setShowPw] = React.useState(false);

    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const emailOk = email.length === 0 ? true : isEmail(email);
    const pwOk = password.length === 0 ? true : password.length >= 6;

    const canSubmit = isEmail(email) && password.length >= 6 && !loading;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        if (!canSubmit) {
            setError("กรุณากรอกอีเมลให้ถูกต้อง และรหัสผ่านอย่างน้อย 6 ตัวอักษร");
            return;
        }

        try {
            setLoading(true);

            // TODO: เปลี่ยนเป็น API จริงของคุณ
            // ตัวอย่าง expected response: { token: "..." }
            // const res = await fetch("/api/auth/login", { ... })
            // const data = await res.json()

            // ===== DEMO login (แทน API) =====
            // ให้ login ได้เมื่อ email มีรูปแบบถูก + password >= 6
            const token = "demo_token_" + Date.now();
            // ===============================

            // เซ็ต cookie ให้ middleware อ่านได้ (กัน /admin)
            document.cookie = `${TOKEN_COOKIE}=${token}; path=/; max-age=${60 * 60 * 24 * 7
                }`; // 7 วัน

            // redirect กลับไปหน้าเดิมที่ user ตั้งใจเข้า
            const params = new URLSearchParams(window.location.search);
            const next = params.get("next") || "/admin/dashboard";
            router.replace(next);
        } catch (err: any) {
            setError(err?.message || "เข้าสู่ระบบไม่สำเร็จ กรุณาลองใหม่");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <Box className="w-full max-w-md">
                {/* Brand / Header */}
                <Stack className="mb-6 items-center text-center">
                    <Box className="mb-3 grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <DirectionsCarRoundedIcon />
                    </Box>
                </Stack>

                <Card
                    elevation={0}
                    className="w-full rounded-2xl! border border-slate-200 bg-white"
                    sx={{ boxShadow: "none" }}
                >
                    {/* ให้ scroll เฉพาะใน Card ถ้าเนื้อหาเกินความสูงของสี่เหลี่ยม */}
                    <CardContent className="p-4! overflow-auto">
                        <Stack spacing={1} className="mb-4 items-center text-center">
                            <Typography variant="h5" className="text-xl font-bold text-slate-900">
                                เข้าสู่ระบบแอดมิน RentFlow
                            </Typography>
                        </Stack>

                        <Divider className="mt-5! mb-10! border-slate-200!" />

                        {error ? (
                            <Alert
                                severity="error"
                                className="mb-4 rounded-xl!"
                                onClose={() => setError(null)}
                            >
                                {error}
                            </Alert>
                        ) : null}

                        <Box component="form" onSubmit={handleSubmit} className="mt-3 grid gap-4">
                            <TextField
                                label="อีเมล"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                sx={pillFieldSX}
                                autoComplete="email"
                                inputMode="email"
                                error={!emailOk}
                                helperText={!emailOk ? "รูปแบบอีเมลไม่ถูกต้อง" : " "}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailRoundedIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                label="รหัสผ่าน"
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                sx={pillFieldSX}
                                autoComplete="current-password"
                                error={!pwOk}
                                helperText={!pwOk ? "อย่างน้อย 6 ตัวอักษร" : " "}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockRoundedIcon fontSize="small" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                edge="end"
                                                onClick={() => setShowPw((v) => !v)}
                                                aria-label={showPw ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
                                            >
                                                {showPw ? (
                                                    <VisibilityOffRoundedIcon fontSize="small" />
                                                ) : (
                                                    <VisibilityRoundedIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!canSubmit}
                                className="rounded-xl! py-3! font-semibold!"
                                sx={{
                                    textTransform: "none",
                                    bgcolor: "rgb(15 23 42)",
                                    boxShadow: "none",
                                    "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                                }}
                            >
                                {loading ? (
                                    <Stack direction="row" className="items-center gap-2">
                                        <CircularProgress size={18} />
                                        <span>กำลังเข้าสู่ระบบ...</span>
                                    </Stack>
                                ) : (
                                    "เข้าสู่ระบบ"
                                )}
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
}