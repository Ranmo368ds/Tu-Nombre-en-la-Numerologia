import Link from 'next/link';
import { getArchivedMonths } from '@/lib/eddm/monthlyData';

export default function ArchivoPage() {
    const archivedMonths = getArchivedMonths();

    return (
        <div className="min-h-screen bg-white">
            <header className="bg-eddm-navy text-white py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-2">Archivo de Flyers</h1>
                    <p className="text-xl opacity-90">
                        Explora los negocios de meses anteriores
                    </p>
                </div>
            </header>

            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {archivedMonths.map((month) => {
                        const [monthName, year] = month.split('-');
                        const monthNameCap = monthName.charAt(0).toUpperCase() + monthName.slice(1);

                        return (
                            <Link
                                key={month}
                                href={`/eddm/${month}`}
                                className="group block p-6 bg-gradient-to-br from-eddm-sky-blue to-eddm-navy rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="text-white">
                                    <div className="text-sm opacity-80 mb-2">Flyer de</div>
                                    <h2 className="text-3xl font-bold mb-1">{monthNameCap}</h2>
                                    <div className="text-2xl opacity-90">{year}</div>

                                    <div className="mt-6 flex items-center text-sm">
                                        <span>Ver negocios</span>
                                        <svg
                                            className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                {archivedMonths.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                            No hay flyers archivados todavía
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
