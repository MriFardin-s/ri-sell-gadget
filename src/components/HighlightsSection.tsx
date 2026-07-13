import Link from "next/link";

export function HighlightsSection() {
    return (
        <section className="py-16 bg-neutral-900 text-white dark:bg-black/40 border-y border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">Exclusive Vibe</span>
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-tight">
                        We Vet Each Item For True <span className="text-[var(--color-theme-brown-primary)]">Quality & Status</span>
                    </h2>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xl">
                        Unlike massive multi-vendor mess sites, we curate or verify every gadget listing. Our rigorous sorting filters out the noise, ensuring your hardware experience remains premium.
                    </p>
                    <div className="pt-2">
                        <Link href="/explore" className="btn-theme-brown px-6 py-3 rounded-xl text-sm inline-block shadow-lg">
                            Explore Gadgets
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-neutral-800 rounded-2xl border border-neutral-700/50 space-y-2">
                        <span className="text-2xl"></span>
                        <h3 className="font-bold text-sm uppercase">Priority Status</h3>
                        <p className="text-xs text-neutral-400">Easily find high-priority hardware that moves fast.</p>
                    </div>
                    <div className="p-6 bg-neutral-800 rounded-2xl border border-neutral-700/50 space-y-2 mt-4">
                        <span className="text-2xl"></span>
                        <h3 className="font-bold text-sm uppercase">Condition Check</h3>
                        <p className="text-xs text-neutral-400">Detailed tag systems for pristine used or brand new products.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}