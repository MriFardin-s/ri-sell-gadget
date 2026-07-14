import Link from "next/link";
import { notFound } from "next/navigation";

import { Gadget } from "@/types/gadgets";
import { getGadgetById } from "@/lib/api/gadgets";


interface PageProps {
    params: Promise<{ id: string }>;
}

const GadgetDetailsPage = async ({ params }: PageProps) => {
    const { id } = await params;
    const gadget = await getGadgetById(id) as Gadget | null;

    if (!gadget) {
        notFound();
    }

    const priorityColors: Record<string, string> = {
        high: "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200 dark:border-red-900",
        medium: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900",
        low: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
    };

    const conditionColors: Record<string, string> = {
        new: "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900",
        old: "bg-purple-50 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400 border-purple-200 dark:border-purple-900",
    };

    const currentPriority = gadget.priority?.toLowerCase() || "low";
    const currentCondition = gadget.condition?.toLowerCase() || "old";

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md flex flex-col md:flex-row overflow-hidden">

                <div className="md:w-1/2 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center p-6 relative min-h-[350px]">
                    <img
                        src={gadget.imageUrl}
                        alt={gadget.title}
                        className="max-w-full max-h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className={`absolute top-5 left-5 px-3 py-1 text-xs font-bold uppercase border tracking-wider rounded-lg ${priorityColors[currentPriority] || priorityColors.low}`}>
                        {gadget.priority} Priority
                    </span>

                    <span className={`absolute top-5 right-3 px-2.5 py-1 text-xs font-bold uppercase border tracking-wider rounded-lg ${conditionColors[currentCondition] || conditionColors.old}`}>
                        {gadget.condition}
                    </span>
                </div>

                <div className="md:w-1/2 p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between gap-4 mb-4">
                            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                                Status: <span className="text-neutral-700 dark:text-neutral-300 font-bold">{gadget.status}</span>
                            </span>
                        </div>

                        <h1 className="text-3xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                            {gadget.title}
                        </h1>

                        <p className="mt-2 text-base font-medium text-neutral-500 dark:text-neutral-400 italic">
                            {gadget.shortDescription}
                        </p>

                        <div className="mt-6 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                            <h2 className="text-sm font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider mb-2">
                                Description
                            </h2>
                            <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed whitespace-pre-line">
                                {gadget.fullDescription}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-neutral-100 dark:border-neutral-800">
                        <div className="flex items-baseline gap-2 mb-6">
                            <span className="text-xs font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">Price:</span>
                            <span className="text-3xl font-black text-neutral-900 dark:text-neutral-100">
                                ${gadget.price}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] hover:opacity-90 shadow-sm transition uppercase tracking-wider text-center">
                                Proceed to Request
                            </button>
                            <Link
                                href="/explore"
                                className="px-6 py-3 text-sm font-bold text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 shadow-sm transition uppercase tracking-wider text-center"
                            >
                                Back to All
                            </Link>
                        </div>

                        {gadget.user?.name && (
                            <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-950/50 border border-neutral-100 dark:border-neutral-900/60 flex flex-col gap-1">
                                <span className="text-[10px] font-bold uppercase text-neutral-400 dark:text-neutral-500 tracking-wider">Listed By</span>
                                <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">{gadget.user.name}</span>
                                <span className="text-[11px] text-neutral-400 dark:text-neutral-500">{gadget.user.email}</span>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GadgetDetailsPage;