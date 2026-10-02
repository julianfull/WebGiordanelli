import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { SHOW_PROPUESTAS } from "@/lib/data";

/* Manual de Identidad Visual 4.1 / 4.4: Montserrat (secundaria y sustituto web de las
   fuentes comerciales) e Inter (texto corrido). Solo pesos autorizados y en uso. */
const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: SHOW_PROPUESTAS
    ? "Pablo Giordanelli · Gobernación de Risaralda 2028-2031"
    : "Pablo Giordanelli · Una Risaralda de todos, para todos",
  description: SHOW_PROPUESTAS
    ? "Pablo Giordanelli, candidato a la Gobernación de Risaralda. Una Risaralda de todos, para todos."
    : "Pablo Giordanelli. Una Risaralda de todos, para todos. #RisaraldaNosUne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${inter.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
