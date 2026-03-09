"use client";

import * as React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    Divider,
    TextField,
    Chip,
} from "@mui/material";

function formatTHB(n: number) {
    return new Intl.NumberFormat("th-TH", {
        maximumFractionDigits: 0,
    }).format(n) + " บาท";
}

export default function AdminReportsPage() {
    const [from, setFrom] = React.useState("2026-03-01");
    const [to, setTo] = React.useState("2026-03-31");

    const stats = {
        bookings: 124,
        revenue: 186500,
        customers: 78,
    };

    return (
        <Box className="grid gap-4">

            {/* Header */}
            <Box>
                <Typography
                    variant="h6"
                    className="text-xl font-extrabold text-slate-900"
                >
                    รายงาน
                </Typography>
                <Typography className="text-sm text-slate-600">
                    สรุปผลการดำเนินงาน และส่งออกข้อมูลสำหรับวิเคราะห์
                </Typography>
            </Box>

            {/* Filters */}
            <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
                <CardContent className="p-5">

                    <Typography className="text-sm font-bold text-slate-900">
                        ช่วงเวลารายงาน
                    </Typography>

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        className="mt-3"
                    >
                        <TextField
                            type="date"
                            size="small"
                            label="จากวันที่"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <TextField
                            type="date"
                            size="small"
                            label="ถึงวันที่"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                        />

                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                bgcolor: "rgb(15 23 42)",
                                boxShadow: "none",
                                "&:hover": {
                                    bgcolor: "rgb(2 6 23)",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            โหลดข้อมูล
                        </Button>
                    </Stack>
                </CardContent>
            </Card>

            {/* KPI */}
            <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={2}
            >

                <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white flex-1">
                    <CardContent>
                        <Typography className="text-xs text-slate-500">
                            จำนวนการจอง
                        </Typography>
                        <Typography className="text-xl font-bold text-slate-900 mt-1">
                            {stats.bookings}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white flex-1">
                    <CardContent>
                        <Typography className="text-xs text-slate-500">
                            รายได้รวม
                        </Typography>
                        <Typography className="text-xl font-bold text-slate-900 mt-1">
                            {formatTHB(stats.revenue)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white flex-1">
                    <CardContent>
                        <Typography className="text-xs text-slate-500">
                            ลูกค้าใหม่
                        </Typography>
                        <Typography className="text-xl font-bold text-slate-900 mt-1">
                            {stats.customers}
                        </Typography>
                    </CardContent>
                </Card>

            </Stack>

            {/* Export */}
            <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
                <CardContent className="p-5">

                    <Typography className="text-sm font-bold text-slate-900">
                        Export รายงาน
                    </Typography>

                    <Typography className="mt-1 text-xs text-slate-500">
                        ส่งออกข้อมูลเป็น CSV หรือ Excel ตามช่วงเวลาที่เลือก
                    </Typography>

                    <Divider className="my-4! border-slate-200!" />

                    <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>

                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderColor: "rgb(226 232 240)",
                            }}
                        >
                            Export Bookings CSV
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderColor: "rgb(226 232 240)",
                            }}
                        >
                            Export Payments CSV
                        </Button>

                        <Button
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                                borderColor: "rgb(226 232 240)",
                            }}
                        >
                            Export Customers CSV
                        </Button>

                        <Button
                            variant="contained"
                            sx={{
                                textTransform: "none",
                                bgcolor: "rgb(15 23 42)",
                                boxShadow: "none",
                                "&:hover": {
                                    bgcolor: "rgb(2 6 23)",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            ดาวน์โหลดรายงานสรุป
                        </Button>

                    </Stack>

                    <Divider className="my-4! border-slate-200!" />

                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={`ช่วงเวลา ${from} ถึง ${to}`}
                            variant="outlined"
                        />
                    </Stack>

                </CardContent>
            </Card>
        </Box>
    );
}