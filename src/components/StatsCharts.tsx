"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



interface StatsChartsProps {
    stats: {
        totalUsers: number;
        totalGadgets: number;
        lastYearUsers: number;
        lastYearGadgets: number;
    }
}

export function StatsCharts({ stats }: StatsChartsProps) {
    const overviewData = [
        { name: 'Total Metrics', Users: stats.totalUsers, Gadgets: stats.totalGadgets },
        { name: 'Last Year Growth', Users: stats.lastYearUsers, Gadgets: stats.lastYearGadgets }
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Metrics Comparison</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                         data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                            <Tooltip 
                                contentStyle={{ backgroundColor: 'var(--theme-bg)', borderRadius: '12px', borderColor: 'rgba(0,0,0,0.1)' }}
                            />
                            <Legend />
                            <Bar dataKey="Users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="Gadgets" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-md">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 mb-6">Platform Expansion Trend</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={overviewData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-neutral-200 dark:stroke-neutral-800" />
                            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} />
                            <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                            <Tooltip />
                            <Legend />
                            <Area type="monotone" dataKey="Users" stroke="#10b981" fillOpacity={0.2} fill="#10b981" />
                            <Area type="monotone" dataKey="Gadgets" stroke="#a855f7" fillOpacity={0.2} fill="#a855f7" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}