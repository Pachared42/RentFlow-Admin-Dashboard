"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";

type Props = {
    onOpenMobile: () => void;
    drawerWidth?: number;
};

function titleFromPath(pathname: string | null) {
    if (!pathname) return "Dashboard";
    if (pathname.startsWith("/admin/dashboard")) return "แดชบอร์ด";
    if (pathname.startsWith("/admin/bookings")) return "การจอง";
    if (pathname.startsWith("/admin/cars")) return "รถ";
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
    const router = useRouter();
    const title = titleFromPath(pathname);

    const [openProfile, setOpenProfile] = React.useState(false);

    const closeProfile = () => setOpenProfile(false);
    const openProfileDrawer = () => setOpenProfile(true);

    return (
        <>
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
                        </Stack>

                        <Stack direction="row" spacing={1} alignItems="center">
                            {/* Profile -> เปิด Sidebar ขวา */}
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<PersonRoundedIcon />}
                                sx={{
                                    textTransform: "none",
                                    borderRadius: 2,
                                    borderColor: "rgb(226 232 240)",
                                    color: "rgb(15 23 42)",
                                    "&:hover": { borderColor: "rgb(203 213 225)", bgcolor: "rgb(248 250 252)" },
                                }}
                                onClick={openProfileDrawer}
                            >
                                โปรไฟล์
                            </Button>
                        </Stack>
                    </Stack>
                </Toolbar>
            </AppBar>

            {/* Right Sidebar (Profile Drawer) */}
            <Drawer
                anchor="right"
                open={openProfile}
                onClose={closeProfile}
                PaperProps={{
                    sx: {
                        width: { xs: "88vw", sm: 360 },
                        borderLeft: "1px solid rgb(226 232 240)",
                    },
                }}
            >
                {/* Header */}
                <Box sx={{ px: 2, py: 1.5 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography sx={{ fontWeight: 800, color: "rgb(15 23 42)" }}>
                            โปรไฟล์
                        </Typography>
                        <IconButton onClick={closeProfile} aria-label="Close profile">
                            <CloseRoundedIcon />
                        </IconButton>
                    </Stack>
                </Box>

                <Divider />

                {/* Profile Summary */}
                <Box sx={{ px: 2, py: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 44, height: 44, bgcolor: "rgb(15 23 42)" }}>
                            A
                        </Avatar>
                        <Box>
                            <Typography sx={{ fontWeight: 800, color: "rgb(15 23 42)", lineHeight: 1.2 }}>
                                Admin User
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "rgb(100 116 139)" }}>
                                admin@example.com
                            </Typography>
                        </Box>
                    </Stack>
                </Box>

                <Divider />

                {/* Actions */}
                <List disablePadding>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                router.push("/admin/settings");
                                closeProfile();
                            }}
                        >
                            <ListItemText
                                primary="ตั้งค่าโปรไฟล์"
                                primaryTypographyProps={{ fontWeight: 700, color: "rgb(15 23 42)" }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>

                <Box sx={{ flex: 1 }} />

                <Divider />

                {/* Logout */}
                <Box sx={{ p: 2 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<LogoutRoundedIcon />}
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
                            closeProfile();
                        }}
                    >
                        ออกจากระบบ
                    </Button>
                </Box>
            </Drawer>
        </>
    );
}