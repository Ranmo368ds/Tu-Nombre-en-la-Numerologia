import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { WheelProvider } from "@/context/WheelContext";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Rueda de Sorteos - ¡Gira y Gana! 🎉",
  description: "Una herramienta gratuita, moderna y divertida para sorteos y rifas. Perfecta para streams, eventos y colegios. Creada con ❤️ por Antigravity.",
  keywords: ["sorteo", "rueda", "rifa", "aleatorio", "ganador", "wheel of names", "español"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          "font-sans bg-[#f8fafc] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen selection:bg-indigo-500/30"
        )}
      >
        <WheelProvider>
          {children}
        </WheelProvider>
      </body>
    </html>
  );
}
