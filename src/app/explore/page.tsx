import { getGadgets } from '@/lib/api/gadgets';
import GadgetCard from '@/components/GadgetCard';
import { GadgetCardData } from '@/types/gadgets';




const AllGadgets = async () => {
    const gadgets: GadgetCardData[] = await getGadgets() || [];

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                        Explore <span className="bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] bg-clip-text text-transparent">Gadgets</span>
                    </h1>
                    <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                        Browse through our collection of premium listed devices.
                    </p>
                </div>

                {gadgets.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                        <p className="text-neutral-500 dark:text-neutral-400 font-medium">No gadgets found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {gadgets.map((gadget) => (
                            <GadgetCard key={gadget._id} gadget={gadget} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllGadgets;