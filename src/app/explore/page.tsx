import { getGadgets } from '@/lib/api/gadgets';
import { GadgetsApiResponse } from '@/types/gadgets';
import ExploreGadgetsClient from './GadgetExplorer';

interface PageProps {
    searchParams: Promise<{
        search?: string;
        priority?: string;
        condition?: string;
        sort?: string;
        page?: string;
    }>;
}

const AllGadgets = async ({ searchParams }: PageProps) => {
    const params = await searchParams;
    const search = params.search || "";
    const priority = params.priority || "";
    const condition = params.condition || "";
    const sort = params.sort || "newest";
    const page = params.page || "1";

    const data: GadgetsApiResponse = await getGadgets({ search, priority, condition, sort, page }) || {
        gadgets: [],
        totalItems: 0,
        totalPages: 1
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                        Explore <span className="bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] bg-clip-text text-transparent">Gadgets</span>
                    </h1>
                </div>
                <ExploreGadgetsClient serverData={data} activeFilters={{ search, priority, condition, sort, page: Number(page) }} />
            </div>
        </div>
    );
};

export default AllGadgets;