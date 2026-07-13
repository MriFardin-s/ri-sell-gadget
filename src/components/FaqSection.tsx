const faqs = [
    { q: "How do you define product priority levels?", a: "Priority levels (High, Medium, Low) correspond to inventory critical rate, search demand, and user urgency settings specified on upload." },
    { q: "Can I manage items from the mobile view?", a: "Yes, our dashboard layout and item management systems are built fully responsive using modular grid flows." },
    { q: "Is there a real-time sync for the filters?", a: "Absolutely. All filter triggers update search state triggers directly using React server parameters synchronously." }
];

export function FAQSection() {
    return (
        <section className="py-16 bg-white dark:bg-neutral-950/40 border-t border-neutral-200 dark:border-neutral-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-theme-brown-primary)]">Got Questions?</span>
                    <h2 className="text-3xl font-black uppercase tracking-tight text-[var(--theme-text)] mt-1">Frequently Asked</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="p-5 bg-[var(--theme-bg)] dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-900 rounded-2xl">
                            <h3 className="font-bold text-sm sm:text-base text-[var(--theme-text)] uppercase tracking-tight">{faq.q}</h3>
                            <p className="mt-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}