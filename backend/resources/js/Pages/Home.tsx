import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Home
                </h2>
            }
        >
            <Head title="Home" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-lg font-semibold mb-2">🔓 Logged in!</h3>
                            <div className="mt-6 space-y-4">
                                <h4 className="text-xl font-bold text-purple-700">💻 Project: {import.meta.env.VITE_APP_NAME.replace(/([A-Z])/g, ' $1').trim()} 🌍</h4>

                                <div>
                                    <h5 className="font-semibold text-gray-700 mb-1">📋 Description:</h5>
                                    <p className="text-gray-600">
                                        A web application built with <strong>React + TypeScript</strong>, styled using <strong>TailwindCSS</strong>,
                                        and powered by <strong>InertiaJS with Laravel</strong> on the backend. The main goal of the project is to display
                                         different <strong>countries</strong>.
                                    </p>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-700 mb-1">✨ Features:</h5>
                                    <ul className="list-disc list-inside text-gray-600">
                                        <li>Detailed view for each country</li>
                                        <li>Flag display</li>
                                        <li>List of border countries with their flags and links</li>
                                        <li>Authenticated application</li>
                                    </ul>
                                </div>

                                <div>
                                    <h5 className="font-semibold text-gray-700 mb-1">⚠️ Technical Difficulties:</h5>
                                    <p className="text-gray-600">
                                        The <strong>restcountries.com</strong> API sometimes blocks HTTP cURL requests. This may occur due to the number of times it is fetched, which can result in the machine IP being temporarily blocked. When trying on Postman the url https://restcountries.com/v3.1/all, it gives you an incomplete JSON.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
