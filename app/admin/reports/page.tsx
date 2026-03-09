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

import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import SummarizeRoundedIcon from "@mui/icons-material/SummarizeRounded";

function formatTHB(n: number) {
  return (
    new Intl.NumberFormat("th-TH", {
      maximumFractionDigits: 0,
    }).format(n) + " บาท"
  );
}

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box className="rounded-2xl border border-slate-200 bg-white p-4">
      <Typography className="text-xs font-bold uppercase tracking-wider text-slate-500">
        {title}
      </Typography>
      <Divider className="my-3! border-slate-200!" />
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
}

export default function AdminReportsPage() {
  const [from, setFrom] = React.useState("2026-03-01");
  const [to, setTo] = React.useState("2026-03-31");

  const stats = {
    bookings: 124,
    revenue: 186500,
    customers: 78,
  };

  const roundedFieldSX = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  };

  return (
    <Box className="grid gap-4">
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        className="items-start md:items-center justify-between"
      >
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
      </Stack>

      <Card
        elevation={0}
        className="rounded-2xl! border border-slate-200 bg-white"
      >
        <CardContent className="p-4!">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            className="items-start sm:items-center justify-between"
          >
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-12 w-12 place-items-center rounded-lg border border-slate-200">
                <AssessmentRoundedIcon fontSize="medium" />
              </Box>

              <Box>
                <Typography className="text-sm font-bold text-slate-900">
                  รายงานช่วงวันที่ {from} ถึง {to}
                </Typography>
                <Typography className="mt-1 text-xs text-slate-500">
                  ใช้ดูภาพรวมการจอง รายได้ และลูกค้าใหม่ พร้อม export
                  ข้อมูลออกไปวิเคราะห์ต่อ
                </Typography>
              </Box>
            </Stack>

            <Chip
              label="REPORT READY"
              variant="outlined"
              sx={{
                border: "1px solid rgb(226 232 240)",
                bgcolor: "rgb(248 250 252)",
                color: "rgb(51 65 85)",
                fontWeight: 900,
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Card
        elevation={0}
        className="rounded-2xl! border border-slate-200 bg-white"
      >
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
              sx={roundedFieldSX}
            />

            <TextField
              type="date"
              size="small"
              label="ถึงวันที่"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={roundedFieldSX}
            />

            <Button
              variant="contained"
              startIcon={<CalendarMonthRoundedIcon />}
              sx={{
                textTransform: "none",
                bgcolor: "rgb(15 23 42)",
                boxShadow: "none",
                borderRadius: 2.5,
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

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <Card
          elevation={0}
          className="rounded-2xl! border border-slate-200 bg-white flex-1"
        >
          <CardContent className="p-5!">
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                <ReceiptLongRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography className="text-xs text-slate-500">
                  จำนวนการจอง
                </Typography>
                <Typography className="mt-1 text-2xl font-black text-slate-900">
                  {stats.bookings}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="rounded-2xl! border border-slate-200 bg-white flex-1"
        >
          <CardContent className="p-5!">
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                <PaymentsRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography className="text-xs text-slate-500">
                  รายได้รวม
                </Typography>
                <Typography className="mt-1 text-2xl font-black text-slate-900">
                  {formatTHB(stats.revenue)}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="rounded-2xl! border border-slate-200 bg-white flex-1"
        >
          <CardContent className="p-5!">
            <Stack direction="row" spacing={1.25} className="items-center">
              <Box className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-slate-50">
                <PeopleAltRoundedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography className="text-xs text-slate-500">
                  ลูกค้าใหม่
                </Typography>
                <Typography className="mt-1 text-2xl font-black text-slate-900">
                  {stats.customers}
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Box className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SectionCard title="สรุปรายงาน">
          <Stack spacing={1.5}>
            <Box className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Typography className="text-sm text-slate-600">
                ช่วงเวลาที่เลือก
              </Typography>
              <Typography className="text-sm font-semibold text-slate-900">
                {from} ถึง {to}
              </Typography>
            </Box>

            <Box className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Typography className="text-sm text-slate-600">
                จำนวนรายการจอง
              </Typography>
              <Typography className="text-sm font-semibold text-slate-900">
                {stats.bookings} รายการ
              </Typography>
            </Box>

            <Box className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Typography className="text-sm text-slate-600">
                รายได้รวม
              </Typography>
              <Typography className="text-sm font-semibold text-slate-900">
                {formatTHB(stats.revenue)}
              </Typography>
            </Box>

            <Box className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <Typography className="text-sm text-slate-600">
                ลูกค้าใหม่
              </Typography>
              <Typography className="text-sm font-semibold text-slate-900">
                {stats.customers} คน
              </Typography>
            </Box>
          </Stack>
        </SectionCard>

        <SectionCard title="ส่งออกข้อมูล">
          <Typography className="text-sm text-slate-600">
            ส่งออกข้อมูลเป็น CSV หรือดาวน์โหลดรายงานสรุปตามช่วงเวลาที่เลือก
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<DownloadRoundedIcon />}
              sx={{
                textTransform: "none",
                borderColor: "rgb(226 232 240)",
                borderRadius: 2.5,
              }}
            >
              Export Bookings CSV
            </Button>

            <Button
              variant="outlined"
              startIcon={<DownloadRoundedIcon />}
              sx={{
                textTransform: "none",
                borderColor: "rgb(226 232 240)",
                borderRadius: 2.5,
              }}
            >
              Export Payments CSV
            </Button>
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
            <Button
              variant="outlined"
              startIcon={<DownloadRoundedIcon />}
              sx={{
                textTransform: "none",
                borderColor: "rgb(226 232 240)",
                borderRadius: 2.5,
              }}
            >
              Export Customers CSV
            </Button>

            <Button
              variant="contained"
              startIcon={<SummarizeRoundedIcon />}
              sx={{
                textTransform: "none",
                bgcolor: "rgb(15 23 42)",
                boxShadow: "none",
                borderRadius: 2.5,
                "&:hover": {
                  bgcolor: "rgb(2 6 23)",
                  boxShadow: "none",
                },
              }}
            >
              ดาวน์โหลดรายงานสรุป
            </Button>
          </Stack>

          <Divider className="border-slate-200!" />

          <Chip label={`ช่วงเวลา ${from} ถึง ${to}`} variant="outlined" />
        </SectionCard>
      </Box>
    </Box>
  );
}
