import { notFound } from 'next/navigation';
import EDDMHeader from '@/components/marketing/eddm/EDDMHeader';
import MasonryGrid from '@/components/marketing/eddm/MasonryGrid';
import { getMonthlyData } from '@/lib/eddm/monthlyData';

interface EDDMPageProps {
    params: {
        month: string;
    };
}

export async function generateMetadata({ params }: EDDMPageProps) {
    const { month } = await params;
    const data = getMonthlyData(month);

    if (!data) {
        return {
            title: 'Month not found',
        };
    }

    return {
        title: `Local Services ${month} | Chicago NW Suburbs`,
        description: `Discover ${data.businesses.length} trusted local businesses. Landscaping, Roofing, Tree Service and more. Play and learn.`,
        keywords: ['local services', 'Chicago', 'EDDM', month, ...data.businesses.map(b => b.category)],
    };
}

export default async function EDDMPage({ params }: EDDMPageProps) {
    const { month } = await params;
    const data = getMonthlyData(month);

    if (!data) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white">
            <EDDMHeader currentMonth={month} />

            <main className="container mx-auto px-4 py-8">
                {/* Hero Section */}
                <section className="mb-12 bg-gradient-to-r from-sky-blue to-navy rounded-2xl p-8 md:p-12 text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Welcome to Your Local Directory!
                    </h1>
                    <p className="text-xl md:text-2xl opacity-90">
                        Discover the best home services in Chicago NW Suburbs
                    </p>
                </section>

                {/* Masonry Grid with all content */}
                <MasonryGrid data={data} />
            </main>
        </div>
    );
}
