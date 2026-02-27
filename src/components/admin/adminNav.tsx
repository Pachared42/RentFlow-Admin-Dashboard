import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";

export type AdminNavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
    group: "Operations" | "Finance" | "Insights" | "System";
};

export const ADMIN_NAV: AdminNavItem[] = [
    { label: "แดชบอร์ด", href: "/admin/dashboard", icon: DashboardRoundedIcon, group: "Operations" },
    { label: "การจอง", href: "/admin/bookings", icon: CalendarMonthRoundedIcon, group: "Operations" },
    { label: "รถ", href: "/admin/cars", icon: DirectionsCarRoundedIcon, group: "Operations" },
    { label: "ลูกค้า", href: "/admin/customers", icon: PeopleAltRoundedIcon, group: "Operations" },

    { label: "การชำระเงิน", href: "/admin/payments", icon: PaymentsRoundedIcon, group: "Finance" },
    { label: "โปรโมชัน", href: "/admin/promotions", icon: LocalOfferRoundedIcon, group: "Finance" },

    { label: "รายงาน", href: "/admin/reports", icon: AssessmentRoundedIcon, group: "Insights" },

    { label: "ซัพพอร์ต", href: "/admin/support", icon: SupportAgentRoundedIcon, group: "System" },
    { label: "ตั้งค่า", href: "/admin/settings", icon: SettingsRoundedIcon, group: "System" },
];