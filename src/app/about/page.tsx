import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-md p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase border-b border-neutral-200 dark:border-neutral-800 pb-4">
          About Our Platform
        </h1>
        
        <div className="mt-6 space-y-6 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
          <p>
            Welcome to our premium gadget management hub. We specialize in providing cutting-edge digital solutions tailored for technology enthusiasts, helping you seamlessly track, explore, and manage your inventory with unmatched efficiency.
          </p>
          <p>
            Built on top of the powerful MERN stack and powered by Next.js, our platform combines high-performance server-side actions with an intuitive user experience. We emphasize lightning-fast loading speeds, robust security measures, and automated dynamic sorting to keep your latest assets instantly visible.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 rounded-lg">
            <h3 className="text-lg font-bold uppercase text-neutral-950 dark:text-white">Our Mission</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              To bridge the gap between complex resource orchestration and flawless frontend usability, ensuring administrators have absolute control over their catalogs.
            </p>
          </div>
          <div className="p-5 border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 rounded-lg">
            <h3 className="text-lg font-bold uppercase text-neutral-950 dark:text-white">Core Technology</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              Leveraging Next.js App Router, Tailored Tailwind CSS layouts, server actions integration, and MongoDB for dynamic real-time updates.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-200 dark:border-neutral-800 text-center">
          <Link
            href="/explore"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold uppercase tracking-wider  text-white bg-gradient-to-r from-[var(--color-theme-brown-primary)] to-[#d9a066] hover:opacity-90 shadow-sm transition rounded"
          >
            Explore Gadgets
          </Link>
        </div>
      </div>
    </div>
  );
}