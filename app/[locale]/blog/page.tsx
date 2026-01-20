import { Suspense } from "react";
import BlogClient from "@/components/BlogClient";
import { getMessages } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const messages: any = await getMessages({ locale });
    const seo = messages.SEO;

    return {
        title: `${messages.HomePage.nav.blog} | ${seo.title}`,
        description: seo.description,
        openGraph: {
            title: `${messages.HomePage.nav.blog} | ${seo.og_title}`,
            description: seo.og_description,
        }
    };
}

export default function BlogPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
                <div className="animate-pulse text-stone-400 font-mystic tracking-widest text-xl">
                    INSTINTO SALUDABLE...
                </div>
            </div>
        }>
            <BlogClient />
        </Suspense>
    );
}
