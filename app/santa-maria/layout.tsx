
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "../[locale]/globals.css"; // Assuming globals css is managing tailwind

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Santa Maria Style Demo",
    description: "Propuesta de diseño",
};

export default function SantaMariaLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className={`${outfit.className} bg-slate-950 text-white antialiased`}>
                {children}
            </body>
        </html>
    );
}
