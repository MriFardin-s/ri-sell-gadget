const testimonials = [
    {
        id: 1,
        name: "Tahmid Rahman",
        role: "Verified Buyer",
        quote: "I recently bought a premium mechanical keyboard from this platform. The gadget was 100% authentic, exactly as described, and the delivery was incredibly fast!",
        avatar: "👨‍💻"
    },
    {
        id: 2,
        name: "Anika Tabassum",
        role: "Gadget Enthusiast",
        quote: "Finding authentic tech gear online is risky, but my experience here was flawless. The product condition updates are real, and the device I received works perfectly.",
        avatar: "👩‍💻"
    }
];

export function TestimonialsSection() {
    return (
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">User Stories</span>
                <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--theme-text)] mt-1">What Techies Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonials.map((t) => (
                    <div key={t.id} className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 rounded-2xl flex flex-col justify-between shadow-xs">
                        <p className="text-sm italic text-neutral-600 dark:text-neutral-400 leading-relaxed">{t.quote}</p>
                        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                            <span className="text-2xl bg-neutral-100 dark:bg-neutral-800 w-10 h-10 rounded-xl flex items-center justify-center">{t.avatar}</span>
                            <div>
                                <h4 className="font-bold text-sm text-[var(--theme-text)]">{t.name}</h4>
                                <p className="text-xs text-neutral-500">{t.role}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}