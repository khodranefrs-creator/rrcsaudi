import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RRC Saudi - Real Estate Development & Investment",
  description:
    "RRC Saudi delivers world-class real estate development and investment solutions across the Kingdom of Saudi Arabia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
