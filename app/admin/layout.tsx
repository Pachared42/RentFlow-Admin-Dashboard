import type { ReactNode } from "react";
import DashboardLayout from "../../src/components/admin/DashboardLayout";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return <DashboardLayout>{children}</DashboardLayout>;
}