import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FAF8F5] px-4 py-8 text-stone-900 selection:bg-amber-500 selection:text-white">
            <div className="mb-6 text-center">
                <Link href="/" className="group inline-flex items-center gap-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-stone-950 font-mono text-sm font-bold text-amber-400 shadow-md transition-transform group-hover:scale-105">
                        TH
                    </span>
                    <span className="text-left">
                        <span className="block font-sans text-sm font-bold tracking-tight text-stone-950">
                            Taufiq Hidayat
                        </span>
                        <span className="block font-mono text-[10px] tracking-widest text-amber-700">
                            STUDIO PORTAL
                        </span>
                    </span>
                </Link>
            </div>

            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-stone-200/80 bg-white/95 p-6 sm:p-8 shadow-xl shadow-stone-900/5 backdrop-blur-sm">
                {children}
            </div>

            <div className="mt-6 text-center">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-stone-500 hover:text-stone-900 transition-colors"
                >
                    <span>&larr;</span>
                    <span>Kembali ke Portofolio Utama</span>
                </Link>
            </div>
        </div>
    );
}

