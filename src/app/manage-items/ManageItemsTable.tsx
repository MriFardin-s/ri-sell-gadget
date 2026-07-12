"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

import { Gadget } from "@/types/gadgets";
import { deleteGadget } from "@/lib/action/gadgets";

interface ManageItemsTableProps {
    initialGadgets: Gadget[];
}

export default function ManageItemsTable({ initialGadgets }: ManageItemsTableProps) {
    const [gadgets, setGadgets] = useState<Gadget[]>(initialGadgets);
    
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDeleteConfirm = async () => {
        if (!productToDelete) return;
        try {
            setIsDeleting(true);
            const result = await deleteGadget(productToDelete);

            if (result && (result.success || result.ok)) {
                setGadgets((prev) =>
                    prev.filter(
                        (p) => (p._id) !== productToDelete
                    )
                );
                toast.success("Product deleted successfully");
                setIsAlertOpen(false);
            } else {
                toast.error(result?.message || "Failed to delete");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete");
        } finally {
            setIsDeleting(false);
            setProductToDelete(null);
        }
    };

    const handleDeleteClick = (id: string) => {
        setProductToDelete(id);
        setIsAlertOpen(true);
    };

    return (
        <div>
            <div className="flex justify-end mb-4">
                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full">
                    Total: {gadgets.length}
                </span>
            </div>

            {gadgets.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-neutral-300 dark:border-neutral-700">
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">No items found.</p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 gap-4 sm:hidden">
                        {gadgets.map((item) => {
                            return (
                                <div key={item._id} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-sm flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-14 w-20 flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center border border-neutral-200 dark:border-neutral-800 rounded">
                                            <img
                                                className="max-h-full max-w-full object-contain"
                                                src={item.imageUrl}
                                                alt={item.title}
                                            />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mt-0.5">
                                                ${item.price}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-neutral-100 dark:border-neutral-800 pt-3 mt-1">
                                        <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase border rounded-lg bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                                            {item.priority || "Low"}
                                        </span>

                                        <div className="flex items-center gap-2">
                                            <Link
                                                href={`/explore/${item._id}`}
                                                className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition rounded"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteClick(item._id)}
                                                className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition rounded"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-800 text-left text-sm text-neutral-500 dark:text-neutral-400">
                            <thead className="bg-neutral-50 dark:bg-neutral-950 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 border-b border-neutral-200 dark:border-neutral-800">
                                <tr>
                                    <th scope="col" className="px-6 py-4">Image</th>
                                    <th scope="col" className="px-6 py-4">Title</th>
                                    <th scope="col" className="px-6 py-4">Price</th>
                                    <th scope="col" className="px-6 py-4">Priority</th>
                                    <th scope="col" className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
                                {gadgets.map((item) => {
                                    return (
                                        <tr key={item._id} className="hover:bg-neutral-50 dark:hover:bg-neutral-950/40 transition-colors">
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <div className="h-12 w-16 bg-neutral-100 dark:bg-neutral-800 overflow-hidden flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                                                    <img
                                                        className="max-h-full max-w-full object-contain"
                                                        src={item.imageUrl}
                                                        alt={item.title}
                                                    />
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-bold text-neutral-900 dark:text-neutral-100 max-w-[200px] truncate">
                                                {item.title}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 font-semibold text-neutral-900 dark:text-neutral-100">
                                                ${item.price}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-bold uppercase border rounded-lg bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
                                                    {item.priority || "Low"}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-3">
                                                    <Link
                                                        href={`/explore/${item._id}`}
                                                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                                                    >
                                                        View
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(item._id)}
                                                        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {isAlertOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 max-w-sm w-full shadow-xl rounded-lg">
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">Are you absolutely sure?</h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                            This action cannot be undone. This will permanently delete the item from the system.
                        </p>
                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setIsAlertOpen(false);
                                    setProductToDelete(null);
                                }}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold uppercase bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition disabled:opacity-50 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                disabled={isDeleting}
                                className="px-4 py-2 text-xs font-bold uppercase bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center min-w-[80px] disabled:opacity-50 rounded"
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}