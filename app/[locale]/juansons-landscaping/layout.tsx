import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import JuansonsHeader from "@/components/juansons-landscaping/JuansonsHeader";
import JuansonsFooter from "@/components/juansons-landscaping/JuansonsFooter";
import Script from "next/script";

export default async function JuansonsLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages({ locale });

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex flex-col min-h-screen bg-white font-sans antialiased text-[#222222] selection:bg-[#91ad41] selection:text-white">
                <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
                <JuansonsHeader />
                <main className="flex-grow">
                    {children}
                </main>
                <JuansonsFooter />
            </div>
        </NextIntlClientProvider>
    );
}
