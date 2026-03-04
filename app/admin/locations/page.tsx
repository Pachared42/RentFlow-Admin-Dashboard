"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Switch,
  Stack,
  TextField,
  IconButton,
  Button,
  Chip,
  Tooltip,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

type Branch = {
  id: string;
  name: string;
  address: string;
  active: boolean;
};

export default function AdminLocationsPage() {
  const [branchesEnabled, setBranchesEnabled] = React.useState(true);

  const [branches, setBranches] = React.useState<Branch[]>([
    { id: "B1", name: "สาขากรุงเทพฯ", address: "รัชดา", active: true },
    { id: "B2", name: "สนามบินดอนเมือง", address: "DMK", active: true },
  ]);

  function updateBranch(id: string, patch: Partial<Branch>) {
    setBranches((prev) => prev.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  function removeBranch(id: string) {
    setBranches((prev) => prev.filter((b) => b.id !== id));
  }

  function addBranch() {
    const nextId = `B${branches.length + 1}`;
    setBranches((prev) => [
      {
        id: nextId,
        name: "สาขาใหม่",
        address: "",
        active: true,
      },
      ...prev,
    ]);
  }

  const activeCount = branches.filter((b) => b.active).length;

  const roundedFieldSX = {
    "& .MuiOutlinedInput-root": { borderRadius: "14px" },
  };

  return (
    <Box className="grid gap-4">
      {/* Header (เหมือน Support) */}
      <Box>
        <Typography variant="h6" className="text-xl font-extrabold text-slate-900">
          จัดการจุดรับ-ส่ง / สาขา
        </Typography>
        <Typography className="text-sm text-slate-600">
          เลือกโหมดใช้งานสาขา และจัดการรายการจุดรับ-ส่งที่ให้ลูกค้าเลือกได้
        </Typography>
      </Box>

      {/* Summary Card (เหมือน Support) */}
      <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
        <CardContent className="p-5">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            className="items-start sm:items-center justify-between"
          >
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-slate-50">
                <PlaceRoundedIcon fontSize="small" />
              </Box>

              <Box>
                <Typography className="text-sm font-bold text-slate-900">
                  โหมดสาขา: {branchesEnabled ? "เปิด" : "ปิด"} • ทั้งหมด {branches.length} • ใช้งาน {activeCount}
                </Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  ปิด = ลูกค้าพิมพ์สถานที่เอง (SME) / เปิด = ลูกค้าเลือกจาก dropdown (Enterprise)
                </Typography>
              </Box>
            </Stack>

            <Stack direction="row" spacing={1} className="items-center">
              <Tooltip title="เปิด/ปิดโหมดสาขา">
                <Stack direction="row" spacing={1} className="items-center">
                  <Typography className="text-xs text-slate-600">Enterprise Mode</Typography>
                  <Switch
                    checked={branchesEnabled}
                    onChange={(e) => setBranchesEnabled(e.target.checked)}
                    size="small"
                  />
                </Stack>
              </Tooltip>

              <Button
                onClick={addBranch}
                variant="contained"
                size="small"
                startIcon={<AddRoundedIcon />}
                sx={{
                  textTransform: "none",
                  bgcolor: "rgb(15 23 42)",
                  boxShadow: "none",
                  "&:hover": { bgcolor: "rgb(2 6 23)", boxShadow: "none" },
                  borderRadius: 2,
                }}
                disabled={!branchesEnabled}
              >
                เพิ่มสาขา
              </Button>

              {/* เผื่ออยากลิงก์ไปตั้งค่าเพิ่มเติมในอนาคต */}
              <Button
                component={Link}
                href="/admin/settings"
                variant="outlined"
                size="small"
                sx={{
                  textTransform: "none",
                  borderRadius: 2,
                  borderColor: "rgb(226 232 240)",
                }}
              >
                ตั้งค่า
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {/* List Card */}
      {branchesEnabled ? (
        <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
          <CardContent className="p-0">
            <Box className="px-5 py-4 flex items-center justify-between">
              <Typography className="text-sm font-bold text-slate-900">
                รายการสาขา / จุดรับ-ส่ง
              </Typography>
              <Typography className="text-xs text-slate-500">{branches.length} รายการ</Typography>
            </Box>

            <Divider className="border-slate-200!" />

            {branches.map((b, idx) => {
              const statusLabel = b.active ? "Active" : "Inactive";
              return (
                <Box key={b.id} className="hover:bg-slate-50 transition-colors">
                  <Box className="p-5 grid gap-4 md:grid-cols-12 items-start">
                    {/* Left meta */}
                    <Box className="md:col-span-4">
                      <Stack direction="row" spacing={1} className="items-center flex-wrap">
                        <Typography className="text-sm font-bold text-slate-900">
                          {b.name}
                        </Typography>

                        <Chip
                          size="small"
                          label={statusLabel}
                          sx={{
                            height: 22,
                            fontSize: 11,
                            bgcolor: b.active ? "rgb(226 232 240)" : "rgb(241 245 249)",
                            border: "1px solid rgb(226 232 240)",
                            color: "rgb(30 41 59)",
                            fontWeight: 800,
                          }}
                        />

                        <Chip
                          size="small"
                          label={`ID: ${b.id}`}
                          variant="outlined"
                          sx={{ height: 22, fontSize: 11 }}
                        />
                      </Stack>

                      <Typography className="mt-1 text-xs text-slate-500 line-clamp-2">
                        {b.address ? `ที่อยู่: ${b.address}` : "ยังไม่ได้ระบุที่อยู่"}
                      </Typography>
                    </Box>

                    {/* Fields */}
                    <Box className="md:col-span-4">
                      <TextField
                        label="ชื่อสาขา"
                        value={b.name}
                        onChange={(e) => updateBranch(b.id, { name: e.target.value })}
                        size="small"
                        fullWidth
                        sx={roundedFieldSX}
                      />
                    </Box>

                    <Box className="md:col-span-3">
                      <TextField
                        label="ที่อยู่ / คำอธิบาย"
                        value={b.address}
                        onChange={(e) => updateBranch(b.id, { address: e.target.value })}
                        size="small"
                        fullWidth
                        sx={roundedFieldSX}
                      />
                    </Box>

                    {/* Actions */}
                    <Box className="md:col-span-1">
                      <Stack direction="row" spacing={0.5} className="justify-end items-center">
                        <Tooltip title={b.active ? "ปิดการใช้งาน" : "เปิดการใช้งาน"}>
                          <Box className="flex items-center">
                            <Switch
                              checked={b.active}
                              onChange={(e) => updateBranch(b.id, { active: e.target.checked })}
                              size="small"
                            />
                          </Box>
                        </Tooltip>

                        <Tooltip title="ลบรายการ">
                          <IconButton
                            color="error"
                            onClick={() => removeBranch(b.id)}
                            sx={{ borderRadius: 2 }}
                          >
                            <DeleteOutlineRoundedIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </Box>
                  </Box>

                  {idx !== branches.length - 1 && <Divider className="border-slate-200!" />}
                </Box>
              );
            })}

            {branches.length === 0 ? (
              <Box className="px-5 py-10 text-center">
                <Typography className="text-sm font-semibold text-slate-900">ยังไม่มีสาขา</Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  กด “เพิ่มสาขา” เพื่อเริ่มต้น
                </Typography>
              </Box>
            ) : null}
          </CardContent>
        </Card>
      ) : (
        <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
          <CardContent className="p-5">
            <Typography className="text-sm font-bold text-slate-900">
              ปิดโหมดสาขาอยู่
            </Typography>
            <Typography className="mt-1 text-xs text-slate-500">
              ลูกค้าจะพิมพ์สถานที่รับ/คืนเอง (เหมาะกับ SME หรือรับ-คืนแบบยืดหยุ่น)
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Tip card (optional but UX ดี) */}
      <Card elevation={0} className="rounded-2xl! border border-slate-200 bg-white">
        <CardContent className="p-5">
          <Typography className="text-sm font-bold text-slate-900">แนะนำการใช้งาน</Typography>
          <Typography className="mt-1 text-xs text-slate-500">
            ถ้ามีหลายจุดรับ-ส่ง (เช่น สนามบิน/สาขา) ให้เปิด Enterprise Mode และตั้งค่า Active เฉพาะจุดที่พร้อมบริการ
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}