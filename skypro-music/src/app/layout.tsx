import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Музыкальный сервис",
  description: "Лучший сервис в мире",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
