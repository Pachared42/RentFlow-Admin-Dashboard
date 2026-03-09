"use client";

import * as React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Chip,
  Stack,
  Drawer,
  IconButton,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery,
  Switch,
  Dialog,
  DialogContent,
  TextField,
  MenuItem,
  styled,
} from "@mui/material";
import type { SwitchProps } from "@mui/material/Switch";

import FactCheckRoundedIcon from "@mui/icons-material/FactCheckRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import HourglassTopRoundedIcon from "@mui/icons-material/HourglassTopRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";
import ZoomInRoundedIcon from "@mui/icons-material/ZoomInRounded";
import ReceiptLongRoundedIcon from "@mui/icons-material/ReceiptLongRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

type Status = "pending" | "approved" | "rejected";
type DrawerMode = "detail" | "status" | null;
type FilterStatus = "all" | Status;

type ExpectedBankAccount = {
  bankName: string;
  accountName: string;
  accountNo: string;
};

type SlipBankAccount = {
  bankName?: string;
  accountName?: string;
  accountNo?: string;
};

type Row = {
  id: string;
  bookingId: string;
  customer: string;
  bookingAmount: number;
  paidAmount: number;
  status: Status;
  slipUrl?: string;
  paidAt?: string;
  referenceNo?: string;
  bankName?: string;
  note?: string;
  reviewerNote?: string;
  expectedAccount: ExpectedBankAccount;
  slipAccount?: SlipBankAccount;
};

function formatTHB(n: number) {
  return (
    new Intl.NumberFormat("th-TH", { maximumFractionDigits: 0 }).format(n) +
    " บาท"
  );
}

function statusLabel(s: Status) {
  if (s === "approved") return "อนุมัติแล้ว";
  if (s === "rejected") return "ไม่ผ่าน";
  return "รอตรวจ";
}

function statusChipSX(s: Status) {
  if (s === "approved") {
    return {
      border: "1px solid rgb(167 243 208)",
      bgcolor: "rgb(209 250 229)",
      color: "rgb(6 95 70)",
      fontWeight: 700,
    };
  }
  if (s === "rejected") {
    return {
      border: "1px solid rgb(254 202 202)",
      bgcolor: "rgb(254 226 226)",
      color: "rgb(153 27 27)",
      fontWeight: 700,
    };
  }
  return {
    border: "1px solid rgb(253 230 138)",
    bgcolor: "rgb(254 243 199)",
    color: "rgb(146 64 14)",
    fontWeight: 700,
  };
}

function compareAccount(expected: ExpectedBankAccount, slip?: SlipBankAccount) {
  if (!slip) {
    return {
      matched: false,
      bankMatched: false,
      accountNameMatched: false,
      accountNoMatched: false,
    };
  }

  const normalize = (s?: string) => (s ?? "").trim().toLowerCase();

  const bankMatched = normalize(expected.bankName) === normalize(slip.bankName);
  const accountNameMatched =
    normalize(expected.accountName) === normalize(slip.accountName);
  const accountNoMatched =
    normalize(expected.accountNo) === normalize(slip.accountNo);

  return {
    matched: bankMatched && accountNameMatched && accountNoMatched,
    bankMatched,
    accountNameMatched,
    accountNoMatched,
  };
}

function MatchChip({
  ok,
  okLabel = "ตรงกัน",
  badLabel = "ไม่ตรงกัน",
}: {
  ok: boolean;
  okLabel?: string;
  badLabel?: string;
}) {
  return (
    <Chip
      size="medium"
      label={ok ? okLabel : badLabel}
      sx={
        ok
          ? {
              border: "1px solid rgb(167 243 208)",
              bgcolor: "rgb(209 250 229)",
              color: "rgb(6 95 70)",
              fontWeight: 800,
              height: 28,
              fontSize: 12,
            }
          : {
              border: "1px solid rgb(254 202 202)",
              bgcolor: "rgb(254 226 226)",
              color: "rgb(153 27 27)",
              fontWeight: 800,
              height: 28,
              fontSize: 12,
            }
      }
    />
  );
}

function StatusChip({ s }: { s: Status }) {
  return (
    <Chip
      size="medium"
      icon={
        s === "approved" ? (
          <CheckCircleRoundedIcon fontSize="small" />
        ) : s === "rejected" ? (
          <CancelRoundedIcon fontSize="small" />
        ) : (
          <HourglassTopRoundedIcon fontSize="small" />
        )
      }
      label={statusLabel(s)}
      variant="outlined"
      sx={{
        ...statusChipSX(s),
        height: 28,
        fontSize: 12,
      }}
    />
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box className="grid grid-cols-1 gap-1 sm:grid-cols-[140px_1fr]">
      <Typography className="text-sm font-medium text-slate-500">
        {label}
      </Typography>
      <Box className="text-sm font-semibold text-slate-900">{value}</Box>
    </Box>
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

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color: theme.palette.grey[100],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: 0.7,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: "#E9E9EA",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function PaymentVerificationPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [rows, setRows] = React.useState<Row[]>([
    {
      id: "1",
      bookingId: "BK-1004",
      customer: "Pachara",
      bookingAmount: 1590,
      paidAmount: 1590,
      status: "pending",
      paidAt: "2026-03-04 13:25",
      referenceNo: "TRX-998871",
      bankName: "SCB",
      note: "ลูกค้าแนบสลิปผ่านหน้าเว็บ",
      reviewerNote: "",
      slipUrl: "/cosySec1.webp",
      expectedAccount: {
        bankName: "SCB",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "123-4-56789-0",
      },
      slipAccount: {
        bankName: "SCB",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "123-4-56789-0",
      },
    },
    {
      id: "2",
      bookingId: "BK-1006",
      customer: "Somchai",
      bookingAmount: 2980,
      paidAmount: 2980,
      status: "approved",
      paidAt: "2026-03-05 09:10",
      referenceNo: "TRX-998872",
      bankName: "KBank",
      note: "ตรวจสอบยอดตรงแล้ว",
      reviewerNote: "ยอดตรงกับรายการจอง",
      slipUrl: "/cosySec1.webp",
      expectedAccount: {
        bankName: "KBank",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "222-3-45678-9",
      },
      slipAccount: {
        bankName: "KBank",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "222-3-45678-9",
      },
    },
    {
      id: "3",
      bookingId: "BK-1007",
      customer: "Nok",
      bookingAmount: 2190,
      paidAmount: 2000,
      status: "rejected",
      paidAt: "2026-03-06 18:42",
      referenceNo: "TRX-998873",
      bankName: "BBL",
      note: "ยอดไม่ตรงกับใบจอง",
      reviewerNote: "ยอดโอนต่ำกว่ายอดที่ต้องชำระ",
      slipUrl: "/cosySec1.webp",
      expectedAccount: {
        bankName: "SCB",
        accountName: "บริษัท RentFlow จำกัด",
        accountNo: "123-4-56789-0",
      },
      slipAccount: {
        bankName: "BBL",
        accountName: "ชื่อบัญชีอื่น",
        accountNo: "999-9-99999-9",
      },
    },
  ]);

  const [drawerMode, setDrawerMode] = React.useState<DrawerMode>(null);
  const [selectedRowId, setSelectedRowId] = React.useState<string | null>(null);
  const [nextStatus, setNextStatus] = React.useState<Status>("pending");
  const [pendingOnly, setPendingOnly] = React.useState(false);
  const [filterStatus, setFilterStatus] = React.useState<FilterStatus>("all");
  const [q, setQ] = React.useState("");
  const [reviewerNoteInput, setReviewerNoteInput] = React.useState("");
  const [zoomOpen, setZoomOpen] = React.useState(false);

  const [snack, setSnack] = React.useState<{
    open: boolean;
    msg: string;
    type: "success" | "error" | "info";
  }>({
    open: false,
    msg: "",
    type: "success",
  });

  const roundedFieldSX = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
    },
  };

  const selectedRow = React.useMemo(
    () => rows.find((r) => r.id === selectedRowId) ?? null,
    [rows, selectedRowId]
  );

  const filteredRows = React.useMemo(() => {
    const keyword = q.trim().toLowerCase();

    return rows.filter((r) => {
      const matchPendingOnly = pendingOnly ? r.status === "pending" : true;
      const matchStatus =
        filterStatus === "all" ? true : r.status === filterStatus;

      const matchKeyword =
        !keyword ||
        r.bookingId.toLowerCase().includes(keyword) ||
        r.customer.toLowerCase().includes(keyword) ||
        (r.referenceNo ?? "").toLowerCase().includes(keyword);

      return matchPendingOnly && matchStatus && matchKeyword;
    });
  }, [rows, pendingOnly, filterStatus, q]);

  function updateStatus(id: string, status: Status, reviewerNote?: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status,
              reviewerNote:
                reviewerNote !== undefined ? reviewerNote : r.reviewerNote,
            }
          : r
      )
    );
  }

  const kpi = React.useMemo(() => {
    const total = rows.length;
    const pending = rows.filter((r) => r.status === "pending").length;
    const approved = rows.filter((r) => r.status === "approved").length;
    const rejected = rows.filter((r) => r.status === "rejected").length;
    return { total, pending, approved, rejected };
  }, [rows]);

  const amountDelta = React.useMemo(() => {
    if (!selectedRow) return 0;
    return selectedRow.paidAmount - selectedRow.bookingAmount;
  }, [selectedRow]);

  const amountMatched = amountDelta === 0;

  const accountCompare = React.useMemo(() => {
    if (!selectedRow) {
      return {
        matched: false,
        bankMatched: false,
        accountNameMatched: false,
        accountNoMatched: false,
      };
    }
    return compareAccount(selectedRow.expectedAccount, selectedRow.slipAccount);
  }, [selectedRow]);

  const openDetailDrawer = (row: Row) => {
    setSelectedRowId(row.id);
    setReviewerNoteInput(row.reviewerNote ?? "");
    setDrawerMode("detail");
  };

  const openStatusDrawer = (row: Row) => {
    setSelectedRowId(row.id);
    setNextStatus(row.status);
    setReviewerNoteInput(row.reviewerNote ?? "");
    setDrawerMode("status");
  };

  const closeDrawer = () => {
    setDrawerMode(null);
  };

  const handleDrawerExited = () => {
    setSelectedRowId(null);
    setNextStatus("pending");
    setReviewerNoteInput("");
  };

  const saveVerificationStatus = () => {
    if (!selectedRow) return;

    if (nextStatus === "approved" && !amountMatched) {
      setSnack({
        open: true,
        msg: "ยอดที่โอนไม่ตรงกับยอดที่ต้องชำระ กรุณาตรวจสอบก่อนอนุมัติ",
        type: "error",
      });
      return;
    }

    if (nextStatus === "approved" && !accountCompare.matched) {
      setSnack({
        open: true,
        msg: "บัญชีปลายทางจากสลิปไม่ตรงกับบัญชีรับเงินของระบบ กรุณาตรวจสอบก่อนอนุมัติ",
        type: "error",
      });
      return;
    }

    if (nextStatus === "rejected" && !reviewerNoteInput.trim()) {
      setSnack({
        open: true,
        msg: "กรุณากรอกหมายเหตุผู้ตรวจสอบเมื่อเลือกสถานะไม่ผ่าน",
        type: "error",
      });
      return;
    }

    updateStatus(selectedRow.id, nextStatus, reviewerNoteInput.trim());
    setDrawerMode(null);
    setSnack({
      open: true,
      msg: `อัปเดตสถานะเป็น "${statusLabel(nextStatus)}" เรียบร้อย`,
      type: "success",
    });
  };

  const quickActions: Array<{
    label: string;
    status: Status;
    variant: "contained" | "outlined";
    icon: React.ReactNode;
    sx: object;
  }> = [
    {
      label: "อนุมัติ",
      status: "approved",
      variant: "contained",
      icon: <CheckCircleRoundedIcon />,
      sx: {
        bgcolor: "rgb(22 163 74)",
        boxShadow: "none",
        "&:hover": { bgcolor: "rgb(21 128 61)", boxShadow: "none" },
      },
    },
    {
      label: "รอตรวจ",
      status: "pending",
      variant: "outlined",
      icon: <HourglassTopRoundedIcon />,
      sx: {
        borderColor: "rgb(253 224 71)",
        color: "rgb(146 64 14)",
        "&:hover": {
          borderColor: "rgb(234 179 8)",
          bgcolor: "rgb(254 249 195)",
        },
      },
    },
    {
      label: "ไม่ผ่าน",
      status: "rejected",
      variant: "outlined",
      icon: <CancelRoundedIcon />,
      sx: {
        borderColor: "rgb(252 165 165)",
        color: "rgb(185 28 28)",
        "&:hover": {
          borderColor: "rgb(248 113 113)",
          bgcolor: "rgb(254 242 242)",
        },
      },
    },
  ];

  return (
    <>
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
              ตรวจสลิป / ยืนยันชำระ
            </Typography>
            <Typography className="text-sm text-slate-600">
              ตรวจสอบรายการโอน แนบสลิป และอัปเดตสถานะให้การจอง
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            className="w-full md:w-auto"
          >
            <TextField
              size="small"
              label="ค้นหา (Booking ID / ลูกค้า / Reference)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full sm:w-80"
              sx={roundedFieldSX}
              InputProps={{
                startAdornment: (
                  <Box className="mr-2 text-slate-500">
                    <SearchRoundedIcon fontSize="small" />
                  </Box>
                ),
              }}
            />

            <TextField
              size="small"
              select
              label="สถานะ"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="w-full sm:w-44"
              sx={roundedFieldSX}
            >
              <MenuItem value="all">ทั้งหมด</MenuItem>
              <MenuItem value="pending">รอตรวจ</MenuItem>
              <MenuItem value="approved">อนุมัติแล้ว</MenuItem>
              <MenuItem value="rejected">ไม่ผ่าน</MenuItem>
            </TextField>

            <Stack direction="row" spacing={1} className="items-center">
              <Typography className="text-xs font-medium text-slate-500">
                แสดงเฉพาะรอตรวจ
              </Typography>
              <IOSSwitch
                checked={pendingOnly}
                onChange={(e) => setPendingOnly(e.target.checked)}
              />
            </Stack>
          </Stack>
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
                  <FactCheckRoundedIcon fontSize="medium" />
                </Box>

                <Box>
                  <Typography className="text-sm font-bold text-slate-900">
                    ทั้งหมด {kpi.total} รายการ • รอตรวจ {kpi.pending} • ผ่าน{" "}
                    {kpi.approved} • ไม่ผ่าน {kpi.rejected}
                  </Typography>
                  <Typography className="mt-1 text-xs text-slate-500">
                    แนะนำให้ตรวจยอด ชื่อบัญชี และบัญชีปลายทางก่อนกดอนุมัติ
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        <Card
          elevation={0}
          className="rounded-2xl! border border-slate-200 bg-white"
        >
          <CardContent className="p-0">
            <Box className="grid">
              {filteredRows.map((r, idx) => {
                const rowAccountCompare = compareAccount(
                  r.expectedAccount,
                  r.slipAccount
                );

                return (
                  <Box key={r.id}>
                    <Box className="p-4 sm:p-5">
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        spacing={2}
                        className="items-start justify-between"
                      >
                        <Stack
                          direction={{ xs: "column", md: "row" }}
                          spacing={2}
                          className="min-w-0 flex-1 w-full"
                        >
                          <Box
                            className="shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100"
                            sx={{
                              width: {
                                xs: "100%",
                                md: 220,
                                lg: 260,
                              },
                              height: {
                                xs: 150,
                                sm: 180,
                                md: 150,
                                lg: 170,
                              },
                            }}
                          >
                            {r.slipUrl ? (
                              <Box
                                component="img"
                                src={r.slipUrl}
                                alt={`slip-${r.bookingId}`}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  display: "block",
                                }}
                              />
                            ) : (
                              <Box className="grid h-full w-full place-items-center bg-linear-to-br from-slate-100 to-slate-200 text-slate-500">
                                <ReceiptLongRoundedIcon sx={{ fontSize: 42 }} />
                              </Box>
                            )}
                          </Box>

                          <Box className="min-w-0 flex-1">
                            <Stack
                              direction="row"
                              spacing={1.5}
                              className="items-center flex-wrap"
                            >
                              <Typography className="text-sm font-extrabold text-slate-900 tracking-wide">
                                {r.bookingId}
                              </Typography>

                              <StatusChip s={r.status} />

                              <Chip
                                size="medium"
                                label={formatTHB(r.paidAmount)}
                                variant="outlined"
                              />

                              {r.paidAmount !== r.bookingAmount ? (
                                <Chip
                                  size="medium"
                                  label="ยอดไม่ตรง"
                                  sx={{
                                    height: 28,
                                    fontSize: 12,
                                    border: "1px solid rgb(254 202 202)",
                                    bgcolor: "rgb(254 226 226)",
                                    color: "rgb(153 27 27)",
                                    fontWeight: 800,
                                  }}
                                />
                              ) : null}

                              {!rowAccountCompare.matched ? (
                                <Chip
                                  size="medium"
                                  label="บัญชีไม่ตรง"
                                  sx={{
                                    height: 28,
                                    fontSize: 12,
                                    border: "1px solid rgb(254 202 202)",
                                    bgcolor: "rgb(254 226 226)",
                                    color: "rgb(153 27 27)",
                                    fontWeight: 800,
                                  }}
                                />
                              ) : null}
                            </Stack>

                            <Typography className="mt-1 text-lg font-bold text-slate-800">
                              {r.customer}
                            </Typography>

                            <Divider className="my-2! border-slate-200!" />

                            <Typography className="text-xs text-slate-500">
                              อ้างอิง:{" "}
                              <span className="font-medium text-slate-700">
                                {r.referenceNo ?? "-"}
                              </span>
                              {" • "}
                              เวลาโอน:{" "}
                              <span className="font-medium text-slate-700">
                                {r.paidAt ?? "-"}
                              </span>
                            </Typography>

                            <Typography className="mt-1 text-xs text-slate-500">
                              ยอดจอง:{" "}
                              <span className="font-medium text-slate-700">
                                {formatTHB(r.bookingAmount)}
                              </span>
                              {" • "}
                              ยอดที่โอน:{" "}
                              <span className="font-medium text-slate-700">
                                {formatTHB(r.paidAmount)}
                              </span>
                            </Typography>

                            <Typography className="mt-1 text-xs text-slate-500">
                              ธนาคารต้นทาง:{" "}
                              <span className="font-medium text-slate-700">
                                {r.bankName ?? "-"}
                              </span>
                            </Typography>
                          </Box>
                        </Stack>

                        <Stack
                          spacing={1.5}
                          className="w-full md:w-auto"
                          sx={{
                            minWidth: { md: 220 },
                          }}
                        >
                          <Box className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                            <Typography className="text-xs text-slate-500">
                              ผลตรวจ
                            </Typography>
                            <Typography className="text-sm font-semibold text-slate-900">
                              {r.status === "approved"
                                ? "ผ่าน"
                                : r.status === "rejected"
                                ? "ไม่ผ่าน"
                                : "รอตรวจ"}
                            </Typography>
                          </Box>

                          <Stack
                            direction="row"
                            spacing={1}
                            className="justify-end"
                          >
                            <Button
                              size="medium"
                              variant="outlined"
                              onClick={() => openDetailDrawer(r)}
                              className="rounded-lg!"
                              sx={{
                                textTransform: "none",
                                borderColor: "rgb(226 232 240)",
                                borderRadius: 2.5,
                              }}
                            >
                              รายละเอียด
                            </Button>

                            <Button
                              size="medium"
                              variant="contained"
                              onClick={() => openStatusDrawer(r)}
                              className="rounded-lg!"
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
                              อัปเดตสถานะ
                            </Button>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Box>

                    {idx !== filteredRows.length - 1 ? (
                      <Divider className="border-slate-200!" />
                    ) : null}
                  </Box>
                );
              })}

              {filteredRows.length === 0 ? (
                <Box className="p-8 text-center">
                  <Typography className="text-sm text-slate-600">
                    ไม่พบรายการที่ตรงกับเงื่อนไข
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Drawer
        anchor={isMobile ? "bottom" : "right"}
        open={drawerMode !== null}
        onClose={closeDrawer}
        ModalProps={{
          keepMounted: true,
          onTransitionExited: handleDrawerExited,
        }}
        PaperProps={{
          sx: {
            width: isMobile ? "100%" : 700,
            height: isMobile ? "88%" : "100%",
            borderTopLeftRadius: isMobile ? 18 : 0,
            borderTopRightRadius: isMobile ? 18 : 0,
            overflow: "hidden",
            bgcolor: "rgb(248 250 252)",
          },
        }}
      >
        <Box className="flex h-full flex-col">
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 20,
              borderBottom: "1px solid rgb(226 232 240)",
              backgroundColor: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(10px)",
            }}
          >
            {isMobile ? (
              <Box className="flex justify-center pt-2">
                <Box className="h-1.5 w-12 rounded-full bg-slate-300" />
              </Box>
            ) : null}

            <Box className="px-4 py-3">
              <Stack
                direction="row"
                spacing={1.5}
                className="items-center justify-between"
              >
                <Stack
                  direction="row"
                  spacing={1.25}
                  className="items-center min-w-0"
                >
                  <Box
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-200"
                    sx={{
                      bgcolor:
                        drawerMode === "status"
                          ? "rgb(254 249 195)"
                          : "rgb(241 245 249)",
                      color:
                        drawerMode === "status"
                          ? "rgb(146 64 14)"
                          : "rgb(15 23 42)",
                    }}
                  >
                    <FactCheckRoundedIcon sx={{ fontSize: 20 }} />
                  </Box>

                  <Box className="min-w-0">
                    <Typography className="truncate text-sm font-black text-slate-900">
                      {drawerMode === "detail"
                        ? "รายละเอียดการตรวจสลิป"
                        : "อัปเดตสถานะการตรวจสอบ"}
                    </Typography>

                    <Typography className="truncate text-xs text-slate-500">
                      {selectedRow
                        ? `${selectedRow.bookingId} • ${selectedRow.customer}`
                        : "-"}
                    </Typography>
                  </Box>
                </Stack>

                <IconButton
                  onClick={closeDrawer}
                  sx={{
                    border: "1px solid rgb(226 232 240)",
                    bgcolor: "white",
                    "&:hover": {
                      bgcolor: "rgb(248 250 252)",
                    },
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </Stack>
            </Box>
          </Box>

          <Box className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
            {drawerMode === "detail" && selectedRow ? (
              <Stack spacing={2}>
                <Box className="overflow-hidden rounded-2xl border border-slate-200 bg-white mb-1">
                  <Box
                    className="relative bg-linear-to-br from-slate-900 to-slate-700"
                    sx={{ minHeight: 220 }}
                  >
                    <Box className="grid h-55 w-full place-items-center text-slate-300">
                      <PaymentsRoundedIcon sx={{ fontSize: 56 }} />
                    </Box>

                    <Box
                      className="absolute inset-0"
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(15,23,42,0.82), rgba(15,23,42,0.18))",
                      }}
                    />

                    <Box className="absolute inset-x-0 top-0 p-4 text-white">
                      <Typography className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                        Verification Overview
                      </Typography>
                      <Typography className="mt-2 text-xl font-extrabold">
                        {selectedRow.bookingId}
                      </Typography>
                      <Typography className="mt-2 text-sm text-slate-200">
                        ลูกค้า {selectedRow.customer}
                      </Typography>
                      <Typography className="mt-4 text-sm text-slate-300">
                        ยอดที่โอน
                      </Typography>
                      <Typography className="text-2xl font-extrabold">
                        {formatTHB(selectedRow.paidAmount)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <SectionCard title="ข้อมูลธุรกรรม">
                    <InfoRow label="Booking ID" value={selectedRow.bookingId} />
                    <InfoRow label="ลูกค้า" value={selectedRow.customer} />
                    <InfoRow
                      label="ยอดที่ต้องชำระ"
                      value={formatTHB(selectedRow.bookingAmount)}
                    />
                    <InfoRow
                      label="ยอดที่โอน"
                      value={formatTHB(selectedRow.paidAmount)}
                    />
                    <InfoRow
                      label="สถานะ"
                      value={<StatusChip s={selectedRow.status} />}
                    />
                  </SectionCard>

                  <SectionCard title="เปรียบเทียบยอด">
                    <InfoRow
                      label="ผลตรวจยอด"
                      value={
                        amountMatched ? (
                          <MatchChip
                            ok={true}
                            okLabel="ยอดตรงกัน"
                            badLabel="ยอดไม่ตรง"
                          />
                        ) : (
                          <MatchChip
                            ok={false}
                            okLabel="ยอดตรงกัน"
                            badLabel={`ต่าง ${formatTHB(
                              Math.abs(amountDelta)
                            )}`}
                          />
                        )
                      }
                    />
                    <InfoRow
                      label="ส่วนต่าง"
                      value={
                        amountDelta === 0
                          ? formatTHB(0)
                          : amountDelta > 0
                          ? `โอนเกิน ${formatTHB(amountDelta)}`
                          : `โอนขาด ${formatTHB(Math.abs(amountDelta))}`
                      }
                    />
                  </SectionCard>

                  <SectionCard title="บัญชีที่ระบบคาดหวัง">
                    <InfoRow
                      label="ธนาคาร"
                      value={selectedRow.expectedAccount.bankName}
                    />
                    <InfoRow
                      label="ชื่อบัญชี"
                      value={selectedRow.expectedAccount.accountName}
                    />
                    <InfoRow
                      label="เลขบัญชี"
                      value={selectedRow.expectedAccount.accountNo}
                    />
                  </SectionCard>

                  <SectionCard title="ข้อมูลบัญชีจากสลิป">
                    <InfoRow
                      label="ธนาคารปลายทาง"
                      value={selectedRow.slipAccount?.bankName ?? "-"}
                    />
                    <InfoRow
                      label="ชื่อบัญชีปลายทาง"
                      value={selectedRow.slipAccount?.accountName ?? "-"}
                    />
                    <InfoRow
                      label="เลขบัญชีปลายทาง"
                      value={selectedRow.slipAccount?.accountNo ?? "-"}
                    />

                    <Divider className="border-slate-200!" />

                    <InfoRow
                      label="ธนาคาร"
                      value={<MatchChip ok={accountCompare.bankMatched} />}
                    />
                    <InfoRow
                      label="ชื่อบัญชี"
                      value={
                        <MatchChip ok={accountCompare.accountNameMatched} />
                      }
                    />
                    <InfoRow
                      label="เลขบัญชี"
                      value={<MatchChip ok={accountCompare.accountNoMatched} />}
                    />
                    <InfoRow
                      label="สรุป"
                      value={
                        <MatchChip
                          ok={accountCompare.matched}
                          okLabel="บัญชีตรงกัน"
                          badLabel="บัญชีไม่ตรงกัน"
                        />
                      }
                    />
                  </SectionCard>

                  <SectionCard title="ข้อมูลอ้างอิง">
                    <InfoRow
                      label="เลขอ้างอิง"
                      value={selectedRow.referenceNo ?? "-"}
                    />
                    <InfoRow
                      label="เวลาโอน"
                      value={selectedRow.paidAt ?? "-"}
                    />
                    <InfoRow
                      label="ธนาคารต้นทาง"
                      value={selectedRow.bankName ?? "-"}
                    />
                  </SectionCard>

                  <SectionCard title="หมายเหตุ">
                    <Typography className="text-sm leading-6 text-slate-700">
                      {selectedRow.note?.trim()
                        ? selectedRow.note
                        : "ยังไม่มีหมายเหตุเพิ่มเติม"}
                    </Typography>

                    <Divider className="border-slate-200!" />

                    <Box>
                      <Typography className="text-xs font-medium text-slate-500">
                        หมายเหตุผู้ตรวจสอบ
                      </Typography>
                      <Typography className="mt-1 text-sm leading-6 text-slate-700">
                        {selectedRow.reviewerNote?.trim()
                          ? selectedRow.reviewerNote
                          : "ยังไม่มีหมายเหตุจากผู้ตรวจสอบ"}
                      </Typography>
                    </Box>
                  </SectionCard>

                  <SectionCard title="สลิปการชำระเงิน">
                    {selectedRow.slipUrl ? (
                      <Stack spacing={2}>
                        <Box className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                          <Box
                            component="img"
                            src={selectedRow.slipUrl}
                            alt={`slip-${selectedRow.bookingId}`}
                            sx={{
                              width: "100%",
                              height: 260,
                              objectFit: "cover",
                              display: "block",
                            }}
                          />
                        </Box>

                        <Button
                          variant="outlined"
                          startIcon={<ZoomInRoundedIcon />}
                          onClick={() => setZoomOpen(true)}
                          sx={{
                            textTransform: "none",
                            borderColor: "rgb(226 232 240)",
                            borderRadius: 2.5,
                          }}
                        >
                          ซูมรูปสลิป
                        </Button>
                      </Stack>
                    ) : (
                      <Box className="grid min-h-45 place-items-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
                        <Stack spacing={1} className="items-center">
                          <ImageRoundedIcon />
                          <Typography className="text-sm">
                            ยังไม่มีรูปสลิป
                          </Typography>
                        </Stack>
                      </Box>
                    )}
                  </SectionCard>
                </Box>

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  className="pt-0.5"
                >
                  <Button
                    fullWidth
                    size="medium"
                    variant="outlined"
                    onClick={closeDrawer}
                    sx={{
                      textTransform: "none",
                      borderColor: "rgb(226 232 240)",
                      color: "rgb(15 23 42)",
                      borderRadius: 2.5,
                    }}
                  >
                    ปิดหน้าต่าง
                  </Button>

                  <Button
                    fullWidth
                    size="medium"
                    variant="outlined"
                    startIcon={<OpenInNewRoundedIcon />}
                    onClick={() =>
                      setSnack({
                        open: true,
                        msg: `พร้อมเชื่อมไปหน้า booking ${selectedRow.bookingId} แล้ว`,
                        type: "info",
                      })
                    }
                    sx={{
                      textTransform: "none",
                      borderColor: "rgb(226 232 240)",
                      color: "rgb(15 23 42)",
                      borderRadius: 2.5,
                    }}
                  >
                    เปิด Booking ที่เกี่ยวข้อง
                  </Button>

                  <Button
                    fullWidth
                    size="medium"
                    variant="contained"
                    onClick={() => setDrawerMode("status")}
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
                    อัปเดตสถานะ
                  </Button>
                </Stack>
              </Stack>
            ) : null}

            {drawerMode === "status" && selectedRow ? (
              <Stack spacing={2}>
                <Box className="overflow-hidden rounded-2xl border border-slate-200 bg-white mb-1">
                  <Box
                    className="relative bg-linear-to-br from-slate-900 to-slate-700"
                    sx={{ minHeight: 220 }}
                  >
                    <Box className="grid h-55 w-full place-items-center text-slate-300">
                      <FactCheckRoundedIcon sx={{ fontSize: 56 }} />
                    </Box>

                    <Box
                      className="absolute inset-0"
                      sx={{
                        background:
                          "linear-gradient(to bottom, rgba(15,23,42,0.82), rgba(15,23,42,0.18))",
                      }}
                    />

                    <Box className="absolute inset-x-0 top-0 p-4 text-white">
                      <Typography className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
                        Verification Status
                      </Typography>

                      <Typography className="mt-2 text-xl font-extrabold">
                        อัปเดตสถานะการตรวจสอบ
                      </Typography>

                      <Typography className="mt-2 text-sm text-slate-200">
                        เลือกผลตรวจใหม่ให้รายการนี้
                      </Typography>

                      <Typography className="mt-4 text-sm text-slate-300">
                        รายการที่เลือก
                      </Typography>
                      <Typography className="text-2xl font-extrabold">
                        {selectedRow.bookingId}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Stack direction="row" spacing={1} className="items-center">
                    <Typography className="text-sm font-bold text-slate-900">
                      สถานะปัจจุบัน
                    </Typography>
                    <StatusChip s={selectedRow.status} />
                  </Stack>
                </Box>

                <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1}
                    className="items-start sm:items-center justify-between"
                  >
                    <Typography className="text-sm font-bold text-slate-900">
                      เลือกสถานะใหม่
                    </Typography>

                    <Stack direction="row" spacing={1} className="items-center">
                      <Typography className="text-xs text-slate-500">
                        จะบันทึกเป็น
                      </Typography>
                      <StatusChip s={nextStatus} />
                    </Stack>
                  </Stack>

                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.2}
                    className="mt-4"
                  >
                    {quickActions.map((action) => {
                      const isActive = nextStatus === action.status;

                      return (
                        <Button
                          key={action.status}
                          variant={isActive ? "contained" : action.variant}
                          startIcon={action.icon}
                          onClick={() => setNextStatus(action.status)}
                          sx={{
                            flex: 1,
                            textTransform: "none",
                            borderRadius: 2.5,
                            ...(isActive
                              ? {
                                  bgcolor: "rgb(15 23 42)",
                                  color: "white",
                                  boxShadow: "none",
                                  "&:hover": {
                                    bgcolor: "rgb(2 6 23)",
                                    boxShadow: "none",
                                  },
                                }
                              : action.sx),
                          }}
                        >
                          {action.label}
                        </Button>
                      );
                    })}
                  </Stack>
                </Box>

                <Box className="rounded-2xl border border-slate-200 bg-white p-4">
                  <Stack spacing={2}>
                    <Box className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <Stack spacing={1}>
                        <Typography className="text-xs font-medium text-slate-500">
                          เปรียบเทียบก่อนบันทึก
                        </Typography>
                        <InfoRow
                          label="ยอดที่ต้องชำระ"
                          value={formatTHB(selectedRow.bookingAmount)}
                        />
                        <InfoRow
                          label="ยอดที่โอน"
                          value={formatTHB(selectedRow.paidAmount)}
                        />
                        <InfoRow
                          label="ผลตรวจยอด"
                          value={
                            <MatchChip
                              ok={amountMatched}
                              okLabel="ยอดตรงกัน"
                              badLabel="ยอดไม่ตรง"
                            />
                          }
                        />
                        <InfoRow
                          label="ผลตรวจบัญชี"
                          value={
                            <MatchChip
                              ok={accountCompare.matched}
                              okLabel="บัญชีตรงกัน"
                              badLabel="บัญชีไม่ตรงกัน"
                            />
                          }
                        />
                      </Stack>
                    </Box>

                    <TextField
                      multiline
                      minRows={4}
                      fullWidth
                      label="หมายเหตุผู้ตรวจสอบ"
                      value={reviewerNoteInput}
                      onChange={(e) => setReviewerNoteInput(e.target.value)}
                      placeholder="เช่น ยอดตรงกับรายการ / เวลาชำระถูกต้อง / บัญชีปลายทางไม่ตรง / ยอดไม่ตรง"
                      sx={roundedFieldSX}
                    />
                  </Stack>
                </Box>

                <Stack direction="row" spacing={2} className="pt-0.5">
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={closeDrawer}
                    sx={{
                      textTransform: "none",
                      borderColor: "rgb(226 232 240)",
                      color: "rgb(15 23 42)",
                      borderRadius: 2.5,
                    }}
                  >
                    ยกเลิก
                  </Button>

                  <Button
                    fullWidth
                    variant="contained"
                    onClick={saveVerificationStatus}
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
                    บันทึกสถานะ
                  </Button>
                </Stack>
              </Stack>
            ) : null}
          </Box>
        </Box>
      </Drawer>

      <Dialog
        open={zoomOpen}
        onClose={() => setZoomOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            overflow: "hidden",
            bgcolor: "black",
          },
        }}
      >
        <DialogContent sx={{ p: 0, bgcolor: "black" }}>
          {selectedRow?.slipUrl ? (
            <Box
              component="img"
              src={selectedRow.slipUrl}
              alt={`zoom-slip-${selectedRow.bookingId}`}
              sx={{
                width: "100%",
                height: "auto",
                display: "block",
                maxHeight: "85vh",
                objectFit: "contain",
                bgcolor: "black",
              }}
            />
          ) : null}
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={2500}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        sx={{ top: 24 }}
      >
        <Alert
          severity={snack.type}
          variant="filled"
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          sx={{ borderRadius: 3 }}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </>
  );
}
