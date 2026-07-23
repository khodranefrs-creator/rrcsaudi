"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  MessageSquare,
  Newspaper,
  Settings,
  LogOut,
  Mail,
} from "lucide-react";

const adminLinks = [
  { label: "Dashboard", href: "/en/admin", icon: LayoutDashboard },
  { label: "Projects", href: "/en/admin/projects", icon: Building2 },
  { label: "Services", href: "/en/admin/services", icon: FileText },
  { label: "Partners", href: "/en/admin/partners", icon: Users },
  { label: "Blog", href: "/en/admin/blog", icon: Newspaper },
  { label: "Inquiries", href: "/en/admin/inquiries", icon: MessageSquare },
  { label: "Contacts", href: "/en/admin/contacts", icon: Mail },
  { label: "Settings", href: "/en/admin/settings", icon: Settings },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-navy-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-white/10">
        <Link href="/en/admin" className="text-xl font-bold">
          RRC <span className="text-gold-500">Admin</span>
        </Link>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {adminLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive
                  ? "bg-gold-500/20 text-gold-500"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/10">
        <Link
          href="/en/admin/login"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-white/60 hover:text-white hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </aside>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-charcoal-50">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AdminContent>{children}</AdminContent>
    </SessionProvider>
  );
}
