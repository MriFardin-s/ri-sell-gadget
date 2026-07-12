import { getUserSession } from "@/lib/core/session";
import { Gadget } from "@/types/gadgets";
import Link from "next/link";
import { redirect } from "next/navigation";




export default async function ManageItemsPage() {

    const user = await getUserSession();
    if (!user) {
        redirect("/login");
    }

    const email = user.email;
    const role = user.role;



    const res = await fetch(`http://localhost:5000/api/gadgets?email=${email}&role=${role}`, {
        cache: "no-store"
    });
    
    if (!res.ok) {
        return <div className="text-center py-10">Failed to load items.</div>;
    }

    const gadgets: Gadget[] = await res.json();

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md p-6 sm:p-8">
                
                <div className="sm:flex sm:items-center sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
                    <div>
                        <h1 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                            Manage Items
                        </h1>
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                            {role === "admin" ? "All items in the system (Admin Mode)" : "Your personal added items"}
                        </p>
                    </div>
                </div>

                {gadgets.length === 0 ? (
                    <div className="text-center py-12 border border-dashed border-neutral-300 dark:border-neutral-700">
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">No items found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
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
                                {gadgets.map((item) => (
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
                                                    href={`/gadgets/${item._id}`}
                                                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition"
                                                >
                                                    View
                                                </Link>
                                                
                                                <button
                                                    className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}