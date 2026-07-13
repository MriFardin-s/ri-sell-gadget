import { Envelope, Handset, LocationArrowFill } from "@gravity-ui/icons";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-900 text-neutral-600 dark:text-neutral-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <h2 className="text-xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                            FARDIN<span className="text-[#d9a066]">.DEV</span>
                        </h2>
                        <p className="text-sm leading-relaxed">
                            Your ultimate destination for discovering premium and authentic gadgets with seamless filtering and experience.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <Link href="/" className="hover:text-[#d9a066] transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/gadgets" className="hover:text-[#d9a066] transition-colors">
                                    Explore Gadgets
                                </Link>
                            </li>
                            {/* <li>
                                <Link href="/dashboard" className="hover:text-[#d9a066] transition-colors">
                                    Dashboard
                                </Link>
                            </li> */}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                            Contact Info
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li className="flex items-center gap-2">
                              
                                <span className="text-[#d9a066]">  <LocationArrowFill/> </span> Khulna, Bangladesh
                            </li>
                            <li className="flex items-center gap-2">
                                
                                <span className="text-[#d9a066]"><Envelope/></span> fkfardin900@gmail.com
                            </li>
                            <li className="flex items-center gap-2">
                                
                                <span className="text-[#d9a066]"> <Handset/> </span> +880 1700-000000
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 uppercase tracking-wider mb-4">
                            Social Links
                        </h3>
                        <div className="flex items-center gap-4 text-sm">
                            <a 
                                href="https://github.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-neutral-50 dark:bg-neutral-900 hover:bg-[#d9a066] hover:text-white dark:hover:bg-[#d9a066] border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all"
                            >
                                GitHub
                            </a>
                            <a 
                                href="https://linkedin.com" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="p-2 bg-neutral-50 dark:bg-neutral-900 hover:bg-[#d9a066] hover:text-white dark:hover:bg-[#d9a066] border border-neutral-200 dark:border-neutral-800 rounded-lg transition-all"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <p>&copy; {currentYear} FARDIN.DEV. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-[#d9a066] transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-[#d9a066] transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}