import Link from "next/link";

export function CTASection() {
    return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden bg-neutral-900 dark:bg-neutral-900/40 border border-neutral-800 rounded-3xl p-8 md:p-12 text-center space-y-6">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-[var(--color-theme-brown-primary)] blur-xl" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">Take Control</span>
                <h2 className="text-2xl md:text-4xl font-black uppercase text-white tracking-tight max-w-2xl mx-auto">
                    Ready to Organize & Upgrade Your Gear?
                </h2>
                <p className="text-neutral-400 text-sm max-w-lg mx-auto">
                    Access our system logs to register, categorize, filter, or manage priority tech components directly inside your dashboard panel.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/manage-items" className="btn-theme-brown px-6 py-3 rounded-xl text-sm shadow-md">
                        Manage Items
                    </Link>
                    <Link href="/explore" className="px-6 py-3 bg-neutral-800 text-white border border-neutral-700 hover:bg-neutral-700 transition-colors rounded-xl text-sm font-bold">
                        Browse All Items
                    </Link>
                </div>
            </div>
        </section>
    );
}