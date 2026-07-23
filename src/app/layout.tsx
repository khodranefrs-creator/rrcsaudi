import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RRC Saudi - Real Estate Development & Investment",
    template: "%s | RRC Saudi",
  },
  description:
    "RRC Saudi delivers world-class real estate development and investment solutions across the Kingdom of Saudi Arabia.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
