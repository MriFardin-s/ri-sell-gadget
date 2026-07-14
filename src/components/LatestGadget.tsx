import { getLatestGadgets } from '@/lib/api/gadgets';
import { GadgetCardData } from '@/types/gadgets';
import Link from 'next/link';


// interface GadgetCardData {
//     _id: string;
//     title: string;
//     shortDescription: string;
//     price: number;
//     priority: string;
//     imageUrl: string;
// }
interface LatestGadgetResponse {
    data?: GadgetCardData[];
    success?: boolean;
    message?: string;
}

const priorityColors: Record<string, string> = {
    high: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-900",
    medium: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900",
    low: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
};

export default async function LatestGadget() {
    const response = await getLatestGadgets();
    const typedResponse = response as LatestGadgetResponse;
    const latestGadgets: GadgetCardData[] = typedResponse?.data || [];

    return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">
                    Fresh Arrivals
                </span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--theme-text)] mt-1">
                    Latest Gadgets
                </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {latestGadgets?.map((gadget) => {
                    const currentPriority = gadget.priority?.toLowerCase() || "low";

                    return (
                        <div key={gadget._id} className="group bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden">
                            <div className="relative w-full h-64 overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                                <img
                                    src={gadget.imageUrl}
                                    alt={gadget.title}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                />
                                <span className={`absolute top-5 right-3 px-2.5 py-1 text-xs font-bold uppercase border tracking-wider rounded-lg ${priorityColors[currentPriority] || priorityColors.low}`}>
                                    {gadget.priority}
                                </span>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-[var(--color-theme-brown-primary)] transition-colors">
                                    {gadget.title}
                                </h3>

                                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 flex-grow">
                                    {gadget.shortDescription}
                                </p>

                                <div className="mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
                                    <span className="text-xl font-black text-neutral-900 dark:text-neutral-100">
                                        ${gadget.price}
                                    </span>

                                    <Link
                                        href={`/explore/${gadget._id}`}
                                        className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] hover:opacity-90 shadow-sm transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 text-center">
                <Link
                    href="/explore"
                    className="inline-block px-8 py-3 font-bold text-sm uppercase tracking-wider text-white bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] hover:opacity-90 shadow-sm transition"
                >
                    Explore All Gadgets
                </Link>
            </div>
        </section>
    );
}