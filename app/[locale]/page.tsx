"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/routing";
import { ArrowRight, Sparkles, Star, ShoppingBag, Music, BookOpen, Gem, Heart, Leaf, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { NewsletterPopup } from "@/components/NewsletterPopup";

import { LanguagePicker } from "@/components/LanguagePicker";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const t = useTranslations("HomePage");

  const categories = [
    { id: "oils", icon: Leaf, label: t("categories.oils"), color: "bg-green-100 text-green-700" },
    { id: "crystals", icon: Gem, label: t("categories.crystals"), color: "bg-purple-100 text-purple-700" },
    { id: "ebooks", icon: BookOpen, label: t("categories.ebooks"), color: "bg-blue-100 text-blue-700" },
    { id: "music", icon: Music, label: t("categories.music"), color: "bg-rose-100 text-rose-700" },
    { id: "supplements", icon: Heart, label: t("categories.supplements"), color: "bg-orange-100 text-orange-700" },
    { id: "kids", icon: Star, label: t("categories.kids"), color: "bg-yellow-100 text-yellow-700" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 font-sans selection:bg-emerald-200">
      <NewsletterPopup />


      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-100/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold tracking-wider mb-6 border border-emerald-100">
              WELLNESS & HARMONY
            </span>
            <h1 className="text-5xl md:text-7xl font-bold font-mystic text-stone-900 mb-6 leading-[1.1]">
              {t("hero.title")}
            </h1>
            <p className="text-lg md:text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full font-medium transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 flex items-center gap-2"
              >
                {t("hero.cta_contact")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/shop"
                className="px-8 py-4 bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 rounded-full font-medium transition-all hover:border-emerald-200 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                {t("hero.cta_shop")}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-mystic text-stone-900">{t("categories.title")}</h2>
          <div className="w-20 h-1 bg-emerald-200 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/shop?category=${cat.id}`} className="group">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-emerald-100 transition-all cursor-pointer h-full"
              >
                <div className={`w-14 h-14 rounded-full ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <span className="font-medium text-stone-700 group-hover:text-emerald-800 transition-colors">{cat.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Grid (Numerology & Radio) */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Numerology Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 p-10 text-white min-h-[400px] flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6 text-purple-200" />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-mystic">{t("features.numerology_title")}</h3>
              <p className="text-slate-300 leading-relaxed max-w-sm">
                {t("features.numerology_desc")}
              </p>
            </div>

            <Link href="/numerology" className="inline-flex items-center gap-2 text-purple-200 group-hover:text-white transition-colors mt-8">
              <span className="border-b border-purple-200/30 group-hover:border-white pb-0.5">Explore Numerology</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* Radio Unica Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-900 p-10 text-white min-h-[400px] flex flex-col justify-between"
          >
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-6">
                <Music className="w-6 h-6 text-emerald-200" />
              </div>
              <h3 className="text-3xl font-bold mb-4 font-mystic">{t("features.radio_title")}</h3>
              <p className="text-emerald-100/80 leading-relaxed max-w-sm">
                {t("features.radio_desc")}
              </p>
            </div>

            <Link href="/radio-unica" className="inline-flex items-center gap-2 text-emerald-200 group-hover:text-white transition-colors mt-8">
              <span className="border-b border-emerald-200/30 group-hover:border-white pb-0.5">Listen Live</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>


      <Footer />
    </div>
  );
}
