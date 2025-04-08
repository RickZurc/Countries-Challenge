import Search from '@/Components/Search';
import ShowCountries from '@/Components/ShowCountries';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const ITEMS_PER_PAGE = 6;

export default function Countries({countries}: { countries: { cca3: string; name_common: string; flag_url: string; region: string }[];}) {
    const continents = Array.from(new Set(countries.map(c => c.region)));

    const [search, setSearch] = useState('');
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [currentPage, setCurrentPage] = useState(1);

    // Atualiza quando filtrar
    useEffect(() => {
        setCurrentPage(1); // resetar para página 1 ao filtrar
    }, [filteredCountries]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        const filtered = countries.filter(c =>
            c.name_common.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCountries(filtered);
    };

    const handleRegionFilter = (region: string) => {
        const filtered = region
            ? countries.filter(c => c.region === region)
            : countries;
        setFilteredCountries(filtered);
    };

    const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
    const paginatedCountries = filteredCountries.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold text-gray-800">Countries</h2>}
        >
            <Head title="Countries" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Search + Region Filter */}
                            <Search
                                search={search}
                                onSearchChange={handleSearch}
                                continents={continents}
                                onRegionChange={handleRegionFilter}
                            />

                            {/* Grid de Países */}
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                <ShowCountries country={paginatedCountries} />
                            </div>

                            {/* Paginação */}
                            <div className="mt-6 flex justify-center gap-2">
                                {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => {
                                    const page = currentPage <= 5 || totalPages <= 10
                                        ? index + 1
                                        : currentPage > totalPages - 5
                                        ? totalPages - 9 + index
                                        : currentPage - 5 + index;

                                    return [
                                        index === 0 && currentPage > 6 && (
                                            <button
                                                key="first"
                                                onClick={() => setCurrentPage(1)}
                                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            >
                                                1
                                            </button>
                                        ),
                                        index === 0 && currentPage > 6 && (
                                            <span key="ellipsis-start" className="px-2">...</span>
                                        ),
                                        <button
                                            key={page}
                                            onClick={() => setCurrentPage(page)}
                                            className={`px-4 py-2 rounded ${
                                                currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                        >
                                            {page}
                                        </button>,
                                        index === 9 && currentPage < totalPages - 5 && (
                                            <span key="ellipsis-end" className="px-2">...</span>
                                        ),
                                        index === 9 && currentPage < totalPages - 5 && (
                                            <button
                                                key="last"
                                                onClick={() => setCurrentPage(totalPages)}
                                                className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            >
                                                {totalPages}
                                            </button>
                                        )
                                    ];
                                }).flat()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
