'use client';

import { useTranslations } from 'next-intl';

export default function LocalFooter() {
    // We can use a simpler translation key approach or hardcode the very minimal parts if they are static branding
    // But better to use proper translations or just generic content.
    // The prompt gave specific footer text. I'll stick to a simple dark footer.

    return (
        <footer className="bg-slate-950 py-12 border-t border-slate-900 text-slate-400 text-sm">
            <div className="container px-4 mx-auto text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                    <h3 className="text-white font-bold text-lg mb-2">Genes Marketing</h3>
                    <p>Marketing para negocios latinos y locales.</p>
                </div>

                <div className="text-center md:text-right">
                    <p className="mb-1">ventas@genesmarketing.com</p>
                    <p>Mon-Fri 9am-6pm CST</p>
                </div>
            </div>
            <div className="container px-4 mx-auto mt-8 pt-8 border-t border-slate-900 text-center text-xs text-slate-600">
                Los resultados varían según industria, zona, temporada y oferta. Garantizamos configuración, diseño y colocación profesional.
            </div>
        </footer>
    );
}
