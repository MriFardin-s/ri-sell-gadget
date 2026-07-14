import Link from "next/link";
import { Sparkles, Box, Thunderbolt, Cubes3Overlap } from "@gravity-ui/icons";
import { getGadgetConditions } from '@/lib/api/gadgets';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  new: Sparkles,
  used: Box,
  // refurbished: Thunderbolt,
  default: Cubes3Overlap,
};
interface CategoryResponse {
    data?: GadgetCondition[];
    success?: boolean;
    message?: string;
}

interface GadgetCondition {
  slug: string;
  name: string;
  count: number;
  iconKey: string;
}

export default async function Categories() {
  const response = await getGadgetConditions();
  const typedResponse = response as CategoryResponse;
  const categories: GadgetCondition[] = typedResponse?.data || [];

  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">Browse by Group</span>
        <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--theme-text)] mt-1">Top Conditions</h2>
      </div>
      <div className="grid grid-cols-2 sm:flex sm:justify-center sm:flex-wrap gap-4">
        {categories?.map((cat: GadgetCondition) => {
          const IconComponent = iconMap[cat.iconKey] || iconMap.default;

          return (
            <Link
              key={cat.slug}
              href={`/explore?condition=${cat.slug}`}
              className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 rounded-2xl flex flex-col items-center text-center transition-all duration-300 hover:border-[var(--color-theme-brown-primary)]/50 hover:-translate-y-1 group"
            >
              <span className="mb-3 text-[var(--color-theme-brown-primary)] group-hover:scale-110 transition-transform">
                <IconComponent className="w-8 h-8" />
              </span>
              <h3 className="font-bold text-sm uppercase tracking-wide text-[var(--theme-text)]">{cat.name}</h3>
              <p className="text-xs text-neutral-500 mt-1">{cat.count} Items Available</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}