"use client";

import * as React from "react";
import { Box, Card, CardContent, Typography, Stack, TextField, Button, Divider } from "@mui/material";

export default function AdminSettingsPage() {
    const [brand, setBrand] = React.useState("RentFlow");
    const [supportEmail, setSupportEmail] = React.useState("support@rentflow.com");
    const [supportPhone, setSupportPhone] = React.useState("099-999-9999");

    return (
        <Box className="grid gap-4">
            <Box>
                <Typography className="text-xl font-extrabold text-slate-900">ตั้งค่า</Typography>
                <Typography className="text-sm text-slate-600">ตั้งค่าพื้นฐานของระบบ (ตัวอย่าง)</Typography>
            </Box>

            <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
                <CardContent className="p-5">
                    <Typography className="text-sm font-bold text-slate-900">ข้อมูลแบรนด์</Typography>
                    <Typography className="mt-1 text-xs text-slate-500">ปรับชื่อแบรนด์และช่องทางติดต่อ</Typography>

                    <Divider className="my-4! border-slate-200!" />

                    <Stack spacing={2}>
                        <TextField size="small" label="ชื่อแบรนด์" value={brand} onChange={(e) => setBrand(e.target.value)} />
                        <TextField size="small" label="อีเมลซัพพอร์ต" value={supportEmail} onChange={(e) => setSupportEmail(e.target.value)} />
                        <TextField size="small" label="เบอร์โทรซัพพอร์ต" value={supportPhone} onChange={(e) => setSupportPhone(e.target.value)} />

                        <Stack direction="row" spacing={1} className="justify-end">
                            <Button variant="outlined" sx={{ textTransform: "none", borderColor: "rgb(226 232 240)" }}>
                                ยกเลิก
                            </Button>
                            <Button
                                variant="contained"
                                sx={{ textTransform: "none", bgcolor: "rgb(15 23 42)", boxShadow: "none", "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" } }}
                            >
                                บันทึก
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}