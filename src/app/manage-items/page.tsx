import { getGadgetForManage } from "@/lib/api/gadgets";
import { getUserSession } from "@/lib/core/session";
import { Gadget } from "@/types/gadgets";
import { redirect } from "next/navigation";
import ManageItemsTable from "./ManageItemsTable";


export default async function ManageItemsPage() {
    const user = await getUserSession();
    if (!user) {
        redirect("/auth/signin");
    }

    const email = user.email;
    const role = user.role;

    let gadgets: Gadget[] = [];
    let isError = false;

    try {
        const data = await getGadgetForManage(email || "", role || "");
        if (data && Array.isArray(data)) {
            gadgets = data;
        } else if (data && typeof data === "object" && "json" in data) {
            const res = data as Response;
            if (res.ok) {
                gadgets = await res.json();
            } else {
                isError = true;
            }
        } else {
            isError = true;
        }
    } catch (err) {
        console.error(err);
        isError = true;
    }

    if (isError) {
        return <div className="text-center py-10">Failed to load items.</div>;
    }

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-md p-4 sm:p-6 lg:p-8">

                <div className="sm:flex sm:items-center sm:justify-between border-b border-neutral-200 dark:border-neutral-800 pb-5 mb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-neutral-100">
                                Manage Items
                            </h1>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                            {role === "admin" ? "All items in the system (Admin Mode)" : "Your personal added items"}
                        </p>
                    </div>
                </div>

                <ManageItemsTable initialGadgets={gadgets} />

            </div>
        </div>
    );
}