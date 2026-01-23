import type { Config } from "tailwindcss";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./collaborative-board/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            // Add performance optimizations
            transitionDuration: {
                '0': '0ms',
                '2000': '2000ms',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
    // Performance optimizations
    future: {
        hoverOnlyWhenSupported: true,
    },
};

export default withNextIntl(config);
