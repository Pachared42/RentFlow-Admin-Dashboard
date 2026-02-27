"use client";

import * as React from "react";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
    Alert,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

type TabKey = "general" | "security";

export default function AdminProfileSettingsPage() {
    const [tab, setTab] = React.useState<TabKey>("general");

    const [profile, setProfile] = React.useState({
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        phone: "",
    });

    const [pwd, setPwd] = React.useState({
        current: "",
        next: "",
        confirm: "",
    });

    const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
    const fileRef = React.useRef<HTMLInputElement | null>(null);

    const [saving, setSaving] = React.useState(false);
    const [okMsg, setOkMsg] = React.useState<string | null>(null);
    const [errMsg, setErrMsg] = React.useState<string | null>(null);

    function onPickAvatar() {
        fileRef.current?.click();
    }

    function onAvatarFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        if (!f) return;

        // basic validation
        const isImg = f.type.startsWith("image/");
        const maxMB = 3;
        if (!isImg) {
            setErrMsg("ไฟล์ต้องเป็นรูปภาพเท่านั้น");
            return;
        }
        if (f.size > maxMB * 1024 * 1024) {
            setErrMsg(`ขนาดรูปต้องไม่เกิน ${maxMB}MB`);
            return;
        }

        setErrMsg(null);
        const url = URL.createObjectURL(f);
        setAvatarUrl(url);
    }

    async function onSaveGeneral() {
        setSaving(true);
        setOkMsg(null);
        setErrMsg(null);
        try {
            // TODO: call API: PATCH /admin/profile
            await new Promise((r) => setTimeout(r, 500));

            setOkMsg("บันทึกข้อมูลโปรไฟล์เรียบร้อย");
        } catch (e) {
            setErrMsg("บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง");
        } finally {
            setSaving(false);
        }
    }

    async function onChangePassword() {
        setSaving(true);
        setOkMsg(null);
        setErrMsg(null);

        try {
            if (!pwd.current || !pwd.next || !pwd.confirm) {
                setErrMsg("กรุณากรอกข้อมูลให้ครบ");
                return;
            }
            if (pwd.next.length < 8) {
                setErrMsg("รหัสผ่านใหม่ต้องอย่างน้อย 8 ตัวอักษร");
                return;
            }
            if (pwd.next !== pwd.confirm) {
                setErrMsg("ยืนยันรหัสผ่านใหม่ไม่ตรงกัน");
                return;
            }

            // TODO: call API: POST /admin/change-password
            await new Promise((r) => setTimeout(r, 500));

            setPwd({ current: "", next: "", confirm: "" });
            setOkMsg("เปลี่ยนรหัสผ่านเรียบร้อย");
        } catch (e) {
            setErrMsg("เปลี่ยนรหัสผ่านไม่สำเร็จ ลองใหม่อีกครั้ง");
        } finally {
            setSaving(false);
        }
    }

    const initials =
        (profile.firstName?.[0] || "").toUpperCase() +
        (profile.lastName?.[0] || "").toUpperCase();

    return (
        <Box sx={{ bgcolor: "rgb(248 250 252)"}}>
            <Container maxWidth="lg">
                <Stack spacing={2.25}>
                    {/* Header */}
                    <Box>
                        <Typography sx={{ fontSize: 24, fontWeight: 900, color: "rgb(15 23 42)" }}>
                            ตั้งค่าโปรไฟล์
                        </Typography>
                        <Typography sx={{ fontSize: 13, color: "rgb(100 116 139)" }}>
                            จัดการข้อมูลส่วนตัวและความปลอดภัยของบัญชีผู้ใช้
                        </Typography>
                    </Box>

                    {/* Alerts */}
                    {okMsg && (
                        <Alert severity="success" onClose={() => setOkMsg(null)}>
                            {okMsg}
                        </Alert>
                    )}
                    {errMsg && (
                        <Alert severity="error" onClose={() => setErrMsg(null)}>
                            {errMsg}
                        </Alert>
                    )}

                    {/* Tabs */}
                    <Card elevation={0} sx={{ border: "1px solid rgb(226 232 240)", borderRadius: 3 }}>
                        <Box sx={{ px: 2, pt: 1.5 }}>
                            <Tabs
                                value={tab}
                                onChange={(_, v) => setTab(v)}
                                textColor="inherit"
                                TabIndicatorProps={{ style: { height: 3 } }}
                            >
                                <Tab value="general" label="ข้อมูลทั่วไป" />
                                <Tab value="security" label="ความปลอดภัย" />
                            </Tabs>
                        </Box>
                        <Divider />

                        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                            {tab === "general" ? (
                                <Stack spacing={3}>
                                    {/* Avatar / basic info */}
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={2}
                                        alignItems={{ xs: "flex-start", sm: "center" }}
                                        justifyContent="space-between"
                                    >
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar
                                                src={avatarUrl || undefined}
                                                sx={{
                                                    width: 64,
                                                    height: 64,
                                                    bgcolor: "rgb(15 23 42)",
                                                    fontWeight: 900,
                                                }}
                                            >
                                                {initials || "A"}
                                            </Avatar>

                                            <Box>
                                                <Typography sx={{ fontWeight: 900, color: "rgb(15 23 42)" }}>
                                                    รูปโปรไฟล์
                                                </Typography>
                                                <Typography sx={{ fontSize: 12, color: "rgb(100 116 139)" }}>
                                                    รองรับไฟล์ .jpg/.png ขนาดไม่เกิน 3MB
                                                </Typography>
                                            </Box>
                                        </Stack>

                                        <Box>
                                            <input
                                                ref={fileRef}
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={onAvatarFileChange}
                                            />
                                            <Button
                                                variant="outlined"
                                                startIcon={<PhotoCameraRoundedIcon />}
                                                onClick={onPickAvatar}
                                                sx={{
                                                    textTransform: "none",
                                                    borderRadius: 2,
                                                    borderColor: "rgb(226 232 240)",
                                                    color: "rgb(15 23 42)",
                                                    "&:hover": { borderColor: "rgb(203 213 225)", bgcolor: "white" },
                                                }}
                                            >
                                                อัปโหลดรูป
                                            </Button>
                                        </Box>
                                    </Stack>

                                    <Divider />

                                    {/* Form */}
                                    <Stack spacing={2.25}>
                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="ชื่อ"
                                                value={profile.firstName}
                                                onChange={(e) =>
                                                    setProfile((p) => ({ ...p, firstName: e.target.value }))
                                                }
                                            />
                                            <TextField
                                                fullWidth
                                                label="นามสกุล"
                                                value={profile.lastName}
                                                onChange={(e) =>
                                                    setProfile((p) => ({ ...p, lastName: e.target.value }))
                                                }
                                            />
                                        </Stack>

                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                            <TextField
                                                fullWidth
                                                label="อีเมล"
                                                value={profile.email}
                                                onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                                            />
                                            <TextField
                                                fullWidth
                                                label="เบอร์โทร"
                                                value={profile.phone}
                                                onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                                            />
                                        </Stack>

                                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                            <Button
                                                variant="contained"
                                                startIcon={<SaveRoundedIcon />}
                                                disabled={saving}
                                                onClick={onSaveGeneral}
                                                sx={{
                                                    textTransform: "none",
                                                    borderRadius: 2,
                                                    bgcolor: "rgb(15 23 42)",
                                                    boxShadow: "none",
                                                    "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                                                }}
                                            >
                                                บันทึก
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                disabled={saving}
                                                onClick={() => {
                                                    setProfile({
                                                        firstName: "Admin",
                                                        lastName: "User",
                                                        email: "admin@example.com",
                                                        phone: "",
                                                    });
                                                    setAvatarUrl(null);
                                                    setOkMsg(null);
                                                    setErrMsg(null);
                                                }}
                                                sx={{
                                                    textTransform: "none",
                                                    borderRadius: 2,
                                                    borderColor: "rgb(226 232 240)",
                                                    color: "rgb(15 23 42)",
                                                    "&:hover": { borderColor: "rgb(203 213 225)", bgcolor: "white" },
                                                }}
                                            >
                                                ยกเลิก
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            ) : (
                                <Stack spacing={3}>
                                    {/* Security */}
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <LockRoundedIcon />
                                        <Box>
                                            <Typography sx={{ fontWeight: 900, color: "rgb(15 23 42)" }}>
                                                เปลี่ยนรหัสผ่าน
                                            </Typography>
                                            <Typography sx={{ fontSize: 12, color: "rgb(100 116 139)" }}>
                                                แนะนำให้ใช้รหัสผ่านที่เดายาก และไม่ซ้ำกับที่อื่น
                                            </Typography>
                                        </Box>
                                    </Stack>

                                    <Divider />

                                    <Stack spacing={2.25} sx={{ maxWidth: 520 }}>
                                        <TextField
                                            type="password"
                                            label="รหัสผ่านปัจจุบัน"
                                            value={pwd.current}
                                            onChange={(e) => setPwd((p) => ({ ...p, current: e.target.value }))}
                                            fullWidth
                                        />
                                        <TextField
                                            type="password"
                                            label="รหัสผ่านใหม่"
                                            value={pwd.next}
                                            onChange={(e) => setPwd((p) => ({ ...p, next: e.target.value }))}
                                            fullWidth
                                            helperText="อย่างน้อย 8 ตัวอักษร"
                                        />
                                        <TextField
                                            type="password"
                                            label="ยืนยันรหัสผ่านใหม่"
                                            value={pwd.confirm}
                                            onChange={(e) => setPwd((p) => ({ ...p, confirm: e.target.value }))}
                                            fullWidth
                                        />

                                        <Button
                                            variant="contained"
                                            startIcon={<SaveRoundedIcon />}
                                            disabled={saving}
                                            onClick={onChangePassword}
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: 2,
                                                bgcolor: "rgb(15 23 42)",
                                                boxShadow: "none",
                                                "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                                            }}
                                        >
                                            เปลี่ยนรหัสผ่าน
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}
                        </CardContent>
                    </Card>
                </Stack>
            </Container>
        </Box>
    );
}