"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";

export function Footer() {
    const t = useTranslations("HomePage");
    const tNav = useTranslations("HomePage.nav");

    return (
        <footer className="bg-stone-900 text-stone-400 py-16 px-6">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                {/* Logo & Description */}
                <div className="md:col-span-1">
                    <img
                        src="/Instinto Saludable/Instinto Saludable B:W/INSTINTO-SALUDABLE-LOGO-B-W.png"
                        alt="Instinto Saludable"
                        className="h-12 w-auto object-contain mb-4"
                    />
                    <p className="text-sm leading-relaxed mb-6">
                        {t("footer.tagline")}
                    </p>
                    {/* Social Media */}
                    <div className="flex gap-3">
                        <a href="https://www.instagram.com/instintosaludable2026/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61585676762435" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="https://www.tiktok.com/foryou?lang=en" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        </a>
                        <a href="https://www.youtube.com/@InstintoSaludable" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                        </a>
                        <a href="https://www.pinterest.com/instintosaludablecom" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0a12 12 0 0 0-4.37 23.17c-.1-.88-.19-2.24 0-3.21.18-.88 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.81-2.43 1.81-2.43.86 0 1.27.64 1.27 1.41 0 .86-.55 2.15-.83 3.34-.24.99.5 1.8 1.48 1.8 1.77 0 3.14-1.87 3.14-4.56 0-2.38-1.71-4.05-4.15-4.05-2.83 0-4.49 2.12-4.49 4.31 0 .85.33 1.77.74 2.27.08.1.09.19.07.29l-.27 1.12c-.04.18-.15.22-.34.13-1.25-.58-2.03-2.4-2.03-3.87 0-3.14 2.28-6.03 6.58-6.03 3.45 0 6.14 2.46 6.14 5.75 0 3.43-2.16 6.19-5.16 6.19-1.01 0-1.96-.52-2.28-1.14l-.62 2.37c-.23.87-.84 1.96-1.25 2.62A12 12 0 1 0 12 0z" /></svg>
                        </a>
                    </div>
                </div>

                {/* Shop Links */}
                <div>
                    <h4 className="text-white font-semibold mb-6">{t("footer.shop")}</h4>
                    <ul className="space-y-4">
                        <li><Link href="/shop?category=oils" className="hover:text-primary-light transition-colors">{tNav("oils")}</Link></li>
                        <li><Link href="/shop?category=crystals" className="hover:text-primary-light transition-colors">Cristales</Link></li>
                        <li><Link href="/shop?category=ebooks" className="hover:text-primary-light transition-colors">{tNav("ebooks")}</Link></li>
                        <li><Link href="/shop?category=music" className="hover:text-primary-light transition-colors">{tNav("emusic")}</Link></li>
                        <li><Link href="/shop?category=holistic" className="hover:text-primary-light transition-colors">{tNav("holistic")}</Link></li>
                    </ul>
                </div>

                {/* Pages */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Páginas</h4>
                    <ul className="space-y-4">
                        <li><Link href="/" className="hover:text-primary-light transition-colors">{tNav("home")}</Link></li>
                        <li><Link href="/numerology" className="hover:text-primary-light transition-colors">{tNav("numerology")}</Link></li>
                        <li><a href="https://tarot-deck-covers.vercel.app" className="hover:text-primary-light transition-colors">{tNav("tarot")}</a></li>
                        <li><Link href="/blog" className="hover:text-primary-light transition-colors">{tNav("blog")}</Link></li>
                        <li><Link href="/contact" className="hover:text-primary-light transition-colors">{tNav("contact")}</Link></li>
                        <li className="pt-2 border-t border-stone-800">
                            <Link href="/radiounica" className="text-yellow-500 hover:text-yellow-400 transition-colors font-semibold flex items-center gap-2">
                                <span className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                                Radio Única (En Vivo)
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-6">Contacto</h4>
                    <ul className="space-y-4 text-sm">
                        <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <a
                                href={`mailto:${typeof window !== 'undefined' && window.location.hostname.includes('genesmarketing') ? 'ventas@genesmarketing.com' : 'instintosaludable@gmail.com'}`}
                                className="hover:text-primary-light transition-colors"
                            >
                                {typeof window !== 'undefined' && window.location.hostname.includes('genesmarketing') ? 'ventas@genesmarketing.com' : 'instintosaludable@gmail.com'}
                            </a>
                        </li>
                        <li className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>Chicago, Illinois - Central Time</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-stone-800 text-center text-sm">
                © {new Date().getFullYear()} Instinto Saludable. {t("footer.rights")}.
            </div>
        </footer>
    );
}
