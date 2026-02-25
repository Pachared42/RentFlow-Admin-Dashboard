"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Box,
    IconButton,
    Stack,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

type Props = {
    onOpenMobile: () => void;
    drawerWidth?: number;
};

function titleFromPath(pathname: string | null) {
    if (!pathname) return "Dashboard";
    if (pathname.startsWith("/admin/dashboard")) return "แดชบอร์ด";
    if (pathname.startsWith("/admin/bookings")) return "การจอง";
    if (pathname.startsWith("/admin/cars")) return "รถ / Fleet";
    if (pathname.startsWith("/admin/customers")) return "ลูกค้า";
    if (pathname.startsWith("/admin/payments")) return "การชำระเงิน";
    if (pathname.startsWith("/admin/promotions")) return "โปรโมชัน";
    if (pathname.startsWith("/admin/reports")) return "รายงาน";
    if (pathname.startsWith("/admin/support")) return "ซัพพอร์ต";
    if (pathname.startsWith("/admin/settings")) return "ตั้งค่า";
    return "Admin";
}

export default function AdminTopbar({ onOpenMobile, drawerWidth = 280 }: Props) {
    const pathname = usePathname();
    const title = titleFromPath(pathname);

    return (
        <AppBar
            position="fixed"
            elevation={0}
            sx={{
                bgcolor: "white",
                color: "rgb(15 23 42)",
                borderBottom: "1px solid rgb(226 232 240)",
                boxShadow: "none",
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { md: `${drawerWidth}px` },
            }}
        >
            <Toolbar className="min-h-16!">
                <Stack direction="row" className="w-full items-center justify-between">
                    <Stack direction="row" spacing={1.25} alignItems="center">
                        {/* Mobile menu button */}
                        <IconButton
                            onClick={onOpenMobile}
                            sx={{ display: { xs: "inline-flex", md: "none" } }}
                            aria-label="Open menu"
                        >
                            <MenuRoundedIcon />
                        </IconButton>

                        <Box>
                            <Typography className="text-xs text-slate-500">Admin</Typography>
                            <Typography className="text-base font-bold text-slate-900">
                                {title}
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="center">
                        <Button
                            component={Link}
                            href="/"
                            size="small"
                            startIcon={<HomeRoundedIcon />}
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                color: "rgb(30 41 59)",
                                "&:hover": { bgcolor: "rgb(248 250 252)" },
                            }}
                        >
                            ไปหน้าเว็บ
                        </Button>

                        {/* ปุ่ม logout (คุณเอาไปผูกกับ auth จริงทีหลังได้) */}
                        <Button
                            size="small"
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                borderRadius: 2,
                                bgcolor: "rgb(15 23 42)",
                                boxShadow: "none",
                                "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                            }}
                            onClick={() => {
                                // TODO: ใส่ logic logout ของคุณตรงนี้
                                // เช่น clear token แล้ว router.push("/login")
                                alert("TODO: logout");
                            }}
                        >
                            ออกจากระบบ
                        </Button>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}