'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, Upload } from 'lucide-react';
import { ZONES_OPTIONS } from './ZonesList';

export default function BookingForm() {
    const t = useTranslations('LocalMarketingPage.form');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // State for controlled inputs that need logic (like zones)
    const [selectedZones, setSelectedZones] = useState<string[]>([]);
    const [hasLogo, setHasLogo] = useState<string>('yes'); // yes/no

    const toggleZone = (zone: string) => {
        setSelectedZones(prev =>
            prev.includes(zone)
                ? prev.filter(z => z !== zone)
                : [...prev, zone]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        // Add custom fields
        formData.set('zones', selectedZones.join(', '));
        formData.set('hasLogo', hasLogo);
        formData.set('_subject', 'Nueva Reserva - Flyer Local (Antigravity)');

        const formId = process.env.NEXT_PUBLIC_FORMSPREE_GENES_ID || 'xaqobdna';

        try {
            const response = await fetch(`https://formspree.io/f/${formId}`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error(error);
            alert('Connection error.');
        } finally {
            setIsLoading(false);
        }
    };

    const industries = [
        "Tree Service", "Roofing", "Tax Services", "Sealcoating", "Painting",
        "HVAC", "Landscaping", "Cleaning", "Real Estate", "Beauty", "Restaurant", "Other"
    ];

    if (isSuccess) {
        return (
            <div className="bg-slate-900 p-12 rounded-2xl border border-green-900/50 text-center shadow-2xl">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">{t('success')}</h2>
                <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-slate-800 text-white px-6 py-2 rounded-lg mt-4 hover:bg-slate-700"
                >
                    Submit another
                </button>
            </div>
        );
    }

    return (
        <motion.form
            id="booking-form"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-slate-900 border border-slate-800 p-6 sm:p-10 rounded-2xl shadow-xl"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.name')} *</label>
                    <input required name="name" type="text" placeholder={t('placeholders.name')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.businessName')} *</label>
                    <input required name="businessName" type="text" placeholder={t('placeholders.businessName')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.industry')} *</label>
                    <select required name="industry" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none appearance-none">
                        <option value="">{t('placeholders.industry')}</option>
                        {industries.map(ind => (
                            <option key={ind} value={ind}>{ind}</option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.phone')} *</label>
                    <input required name="phone" type="tel" placeholder={t('placeholders.phone')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.email')} *</label>
                    <input required name="email" type="email" placeholder={t('placeholders.email')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.city')} *</label>
                    <input required name="city" type="text" placeholder={t('placeholders.city')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>

                {/* Full Width Website */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.website')}</label>
                    <input name="website" type="url" placeholder={t('placeholders.website')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>

            {/* Zones Selection */}
            <div className="mb-6 space-y-3">
                <label className="text-sm font-medium text-slate-300 block">{t('labels.zones')} *</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-950 p-4 rounded-xl border border-slate-700 max-h-48 overflow-y-auto custom-scrollbar">
                    {ZONES_OPTIONS.map(opt => (
                        <label key={opt.value} className={`
                            flex items-center gap-2 p-2 rounded-lg cursor-pointer border text-xs sm:text-sm transition-all
                            ${selectedZones.includes(opt.value)
                                ? 'bg-cyan-950/40 border-cyan-500/50 text-cyan-200'
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800'}
                        `}>
                            <input
                                type="checkbox"
                                value={opt.value}
                                checked={selectedZones.includes(opt.value)}
                                onChange={() => toggleZone(opt.value)}
                                className="hidden"
                            />
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedZones.includes(opt.value) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-600'}`}>
                                {selectedZones.includes(opt.value) && <CheckCircle className="w-3 h-3 text-white" />}
                            </div>
                            <span className="truncate">{opt.label}</span>
                        </label>
                    ))}
                </div>
                {selectedZones.length === 0 && <p className="text-xs text-red-500 mt-1">Please select at least one zone.</p>}
                <input type="hidden" name="dummy-zones" required={selectedZones.length === 0} />
            </div>

            {/* Logo & Message */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-300 block">{t('labels.hasLogo')}</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                            <input type="radio" name="hasLogo_radio" value="yes" checked={hasLogo === 'yes'} onChange={() => setHasLogo('yes')} className="accent-cyan-500" />
                            {t('options.yes')}
                        </label>
                        <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                            <input type="radio" name="hasLogo_radio" value="no" checked={hasLogo === 'no'} onChange={() => setHasLogo('no')} className="accent-cyan-500" />
                            {t('options.no')}
                        </label>
                    </div>
                </div>

                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-slate-300">{t('labels.message')}</label>
                    <textarea name="message" rows={3} placeholder={t('placeholders.message')} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none" />
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading || selectedZones.length === 0}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-red-900/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isLoading ? <Loader2 className="animate-spin" /> : t('submit')}
            </button>

            <div className="text-center mt-6 text-sm text-slate-500">
                <p>{t('trust')}</p>
                <p className="mt-4">
                    O escríbenos directamente a: <a href="mailto:ventas@genesmarketing.com" className="text-cyan-400 hover:text-cyan-300 font-semibold underline decoration-cyan-500/30">ventas@genesmarketing.com</a>
                </p>
            </div>
        </motion.form>
    );
}
