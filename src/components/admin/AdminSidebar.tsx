"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import { ADMIN_NAV } from "./adminNav";

type Props = {
    mobileOpen: boolean;
    onMobileClose: () => void;
    drawerWidth?: number;
};

const GROUP_LABEL: Record<string, string> = {
    Operations: "การจัดการ",
    Finance: "การเงิน",
    Insights: "รายงาน",
    System: "ระบบ",
};

export default function AdminSidebar({
    mobileOpen,
    onMobileClose,
    drawerWidth = 280,
}: Props) {
    const pathname = usePathname();

    const content = (
        <Box className="h-full bg-white">
            {/* Brand */}
            <Box className="px-4 py-4">
                <Stack direction="row" spacing={1.25} alignItems="center">
                    <Box className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                        <DirectionsCarRoundedIcon fontSize="small" />
                    </Box>
                    <Box>
                        <Typography className="text-sm font-extrabold text-slate-900">
                            RentFlow Admin
                        </Typography>
                        <Typography className="text-xs text-slate-500">
                            แผงควบคุมผู้ดูแลระบบ
                        </Typography>
                    </Box>
                </Stack>
            </Box>

            <Divider className="border-slate-200!" />

            {/* Nav */}
            <Box className="px-2 py-3">
                {(["Operations", "Finance", "Insights", "System"] as const).map((group) => {
                    const items = ADMIN_NAV.filter((x) => x.group === group);
                    if (!items.length) return null;

                    return (
                        <Box key={group} className="mb-2">
                            <Typography className="px-2 pb-1 pt-2 text-[11px] font-semibold tracking-wide text-slate-500">
                                {GROUP_LABEL[group]}
                            </Typography>

                            <List dense disablePadding>
                                {items.map((item) => {
                                    const Icon = item.icon;
                                    const active =
                                        pathname === item.href || pathname?.startsWith(item.href + "/");

                                    return (
                                        <ListItemButton
                                            key={item.href}
                                            component={Link}
                                            href={item.href}
                                            onClick={onMobileClose} // mobile: กดแล้วปิด drawer
                                            className="mx-1 my-1 rounded-xl"
                                            sx={{
                                                borderRadius: 3,
                                                "&.Mui-selected": {
                                                    bgcolor: "rgb(241 245 249)",
                                                },
                                                "&.Mui-selected:hover": {
                                                    bgcolor: "rgb(226 232 240)",
                                                },
                                            }}
                                            selected={active}
                                        >
                                            <ListItemIcon sx={{ minWidth: 40 }}>
                                                <Icon
                                                    fontSize="small"
                                                    style={{ opacity: active ? 1 : 0.75 }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={
                                                    <Typography className="text-sm text-slate-800">
                                                        {item.label}
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    );
                                })}
                            </List>
                        </Box>
                    );
                })}
            </Box>

            <Box className="px-4 pb-4 pt-2">
                <Divider className="border-slate-200!" />
                <Typography className="mt-3 text-[11px] text-slate-500">
                    © {new Date().getFullYear()} RentFlow • Admin
                </Typography>
            </Box>
        </Box>
    );

    return (
        <>
            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        borderRight: "1px solid rgb(226 232 240)",
                    },
                }}
            >
                {content}
            </Drawer>

            {/* Desktop Sidebar */}
            <Drawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "none", md: "block" },
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid rgb(226 232 240)",
                    },
                }}
            >
                {content}
            </Drawer>
        </>
    );
}