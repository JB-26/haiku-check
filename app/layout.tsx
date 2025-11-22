import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haiku Check",
  description: "Is that a haiku? Check it now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
