"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { Pagination } from "@heroui/react";
import GadgetCard from "@/components/GadgetCard";
import { GadgetsApiResponse } from "@/types/gadgets";

interface ExploreGadgetsClientProps {
    serverData: GadgetsApiResponse;
    activeFilters: {
        search: string;
        priority: string;
        condition: string;
        sort: string;
        page: number;
    };
}

export default function ExploreGadgetsClient({ serverData, activeFilters }: ExploreGadgetsClientProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();

    const itemsPerPage = 12;
    const { gadgets, totalItems, totalPages } = serverData;
    const { search, priority, condition, sort, page } = activeFilters;

    const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems);

    const updateUrlParams = (updates: Record<string, string | number>) => {
        const params = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === "") {
                params.delete(key);
            } else {
                params.set(key, String(value));
            }
        });

        if (!updates.hasOwnProperty("page")) {
            params.set("page", "1");
        }

        startTransition(() => {
            router.push(`?${params.toString()}`, { scroll: false });
        });
    };

    const getPageNumbers = () => {
        if (totalPages <= 1) {
            return [1];
        }

        const pages: (number | "ellipsis")[] = [];
        const boundaryCount = 1;
        const siblingCount = 1;

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
            return pages;
        }

        pages.push(1);

        if (page > boundaryCount + siblingCount + 1) {
            pages.push("ellipsis");
        }

        const start = Math.max(2, page - siblingCount);
        const end = Math.min(totalPages - 1, page + siblingCount);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - boundaryCount - siblingCount) {
            pages.push("ellipsis");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className={`space-y-6 ${isPending ? "opacity-70 pointer-events-none transition-opacity" : ""}`}>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <div className="lg:col-span-2">
                    <input
                        type="text"
                        placeholder="Search gadgets by title..."
                        defaultValue={search}
                        onChange={(e) => updateUrlParams({ search: e.target.value })}
                        className="w-full px-4 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9a066]"
                    />
                </div>

                <div>
                    <select
                        value={priority}
                        onChange={(e) => updateUrlParams({ priority: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9a066]"
                    >
                        <option value="">All Priorities</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <div>
                    <select
                        value={condition}
                        onChange={(e) => updateUrlParams({ condition: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9a066]"
                    >
                        <option value="">All Conditions</option>
                        <option value="new">New</option>
                        <option value="used">Used</option>
                    </select>
                </div>

                <div>
                    <select
                        value={sort}
                        onChange={(e) => updateUrlParams({ sort: e.target.value })}
                        className="w-full px-3 py-2 text-sm bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d9a066]"
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            {gadgets.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                    <p className="text-neutral-500 dark:text-neutral-400 font-medium">No gadgets match your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {gadgets.map((gadget) => (
                        <GadgetCard key={gadget._id} gadget={gadget} />
                    ))}
                </div>
            )}
            
            <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-center">
                <Pagination className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
                    <Pagination.Summary className="text-sm text-neutral-500 dark:text-neutral-400">
                        Showing <b>{startItem}-{endItem}</b> of <b>{totalItems}</b> results
                    </Pagination.Summary>
                    
                    <Pagination.Content className="flex items-center gap-1 bg-white dark:bg-neutral-900 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <Pagination.Item>
                            <button
                                disabled={page === 1}
                                onClick={() => updateUrlParams({ page: Math.max(1, page - 1) })}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
                            >
                                Previous
                            </button>
                        </Pagination.Item>

                        {getPageNumbers().map((p, i) =>
                            p === "ellipsis" ? (
                                <Pagination.Item key={`ellipsis-${i}`}>
                                    <span className="px-2 text-neutral-400">...</span>
                                </Pagination.Item>
                            ) : (
                                <Pagination.Item key={`page-${p}`}>
                                    <button
                                        onClick={() => updateUrlParams({ page: p })}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                                            p === page
                                                ? "bg-[#d9a066] text-white shadow-sm"
                                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                </Pagination.Item>
                            )
                        )}

                        <Pagination.Item>
                            <button
                                disabled={page === totalPages || totalPages <= 1}
                                onClick={() => updateUrlParams({ page: Math.min(totalPages, page + 1) })}
                                className="px-3 py-1.5 text-xs font-semibold rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </Pagination.Item>
                    </Pagination.Content>
                </Pagination>
            </div>
        </div>
    );
}