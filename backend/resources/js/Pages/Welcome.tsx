import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Welcome({
    auth,
    laravelVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        // Handle image loading error
        document.getElementById('screenshot-container')?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document.getElementById('docs-card-content')?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gradient-to-b from-gray-900 to-black text-white">
                <div className="relative flex min-h-screen flex-col items-center justify-center">
                    <div className="relative w-full max-w-3xl px-6 lg:max-w-7xl z-10">
                        <header className="flex justify-between items-center py-10">
                            
                            <h1 className="text-2xl font-bold text-white">
                                <ApplicationLogo className="h-12 w-auto" /> {import.meta.env.VITE_APP_NAME.replace(/([A-Z])/g, ' $1').trim()} 
                                <span className="text-xl italic"> for Ignited.red</span>
                            </h1>
                            <nav className="flex space-x-3">
                                {auth.user ? (
                                    <Link
                                        href={route('home')}
                                        className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-700 transition duration-200"
                                    >
                                        Home
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-red-700 transition duration-200"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="px-4 py-2 bg-gray-700 rounded-md hover:bg-red-700 transition duration-200"
                                        >
                                            Register
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
                            {/* Hero-like card */}
                            <div className="flex flex-col gap-6 rounded-2xl bg-gray-800/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                                <div id="screenshot-container" className="relative flex w-full flex-1 items-stretch">
                                    <img
                                        src="/images/screenshot.png" // substitui com imagem real do teu projeto
                                        alt="Preview do projeto"
                                        className="aspect-video h-full w-full rounded-xl object-cover"
                                        onError={handleImageError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/80 rounded-xl"></div>
                                </div>

                                <div className="relative flex flex-col gap-2">
                                    <h2 className="text-3xl font-extrabold text-white">🧭 Discover the world</h2>
                                    <p className="text-gray-300 text-base leading-relaxed">
                                        This application allows you to explore detailed information about countries around the world in an interactive and intuitive way. Combine powerful filters, instant search, and dynamic visualizations to discover demographic, geographic, and cultural data of any nation with just a few clicks.
                                    </p>
                                </div>
                            </div>

                            {/* Feature card */}
                            <div className="flex flex-col justify-between gap-6 rounded-2xl bg-gray-800/70 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                                <div className="flex items-center justify-start gap-4">
                                    <div className="rounded-full bg-red-500/20 p-3">
                                        <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M11 17a1 1 0 102 0v-6a1 1 0 10-2 0v6zM7 17a1 1 0 102 0v-6a1 1 0 10-2 0v6z" />
                                            <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm10 12H5V5h10v10z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">⚙️ Technology used</h2>
                                        <p className="text-gray-400 text-sm">
                                            Built with Laravel 12, React, TypeScript, Inertia e TailwindCSS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </main>


                        <footer className="py-4 text-center text-sm">
                            Laravel v{laravelVersion}
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}