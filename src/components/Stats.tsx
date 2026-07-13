import { getStats } from '@/lib/api/gadgets';
import React from 'react';
import { Persons, Box, ArrowUpRight, Timeline } from "@gravity-ui/icons";
import { StatsCharts } from './StatsCharts';



interface StatsMetrics {
    totalUsers: number;
    totalGadgets: number;
    lastYearUsers: number;
    lastYearGadgets: number;
}

export default async function Stats() {
    const response = await getStats();
    const stats: StatsMetrics = response?.data || {
        totalUsers: 0,
        totalGadgets: 0,
        lastYearUsers: 0,
        lastYearGadgets: 0,
    };

    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            subText: `${stats.lastYearUsers} users joined recently`,
            icon: Persons,
            color: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border-blue-100 dark:border-blue-900/50",
        },
        {
            title: "Total Gadgets",
            value: stats.totalGadgets,
            subText: `${stats.lastYearGadgets} products added this year`,
            icon: Box,
            color: "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-100 dark:border-amber-900/50",
        },
        {
            title: "New Users (Last 1 Year)",
            value: stats.lastYearUsers,
            subText: "Platform registration growth",
            icon: ArrowUpRight,
            color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/50",
        },
        {
            title: "New Gadgets (Last 1 Year)",
            value: stats.lastYearGadgets,
            subText: "Inventory expansion rate",
            icon: Timeline,
            color: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400 border-purple-100 dark:border-purple-900/50",
        },
    ];

    return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">
                    Overview
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--theme-text)] mt-1">
                    Platform Statistics
                </h2>
            </div>

            {/* স্ট্যাটস কার্ড গ্রিড */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {statCards.map((card, idx) => {
                    const IconComponent = card.icon;

                    return (
                        <div
                            key={idx}
                            className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md flex items-center justify-between group hover:border-[var(--color-theme-brown-primary)]/40 transition-all duration-300"
                        >
                            <div className="flex flex-col">
                                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    {card.title}
                                </span>
                                <span className="text-3xl font-black text-neutral-900 dark:text-neutral-100 mt-2">
                                    {card.value.toLocaleString()}
                                </span>
                                <span className="text-xs text-neutral-500 mt-1.5 font-medium">
                                    {card.subText}
                                </span>
                            </div>

                            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-105 duration-300 ${card.color}`}>
                                <IconComponent className="w-6 h-6" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recharts ভিজ্যুয়ালাইজেশন সেকশন */}
            <div className="mt-8">
                <StatsCharts stats={stats} />
            </div>
        </section>
    );
}