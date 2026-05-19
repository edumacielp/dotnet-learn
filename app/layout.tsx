import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "dotnet.learn — .NET Developer Field Guide",
  description: "Practical, no-fluff knowledge for .NET developers. Docker, DI, Clean Code, Azure, Terraform.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
