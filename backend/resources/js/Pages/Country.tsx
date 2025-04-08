import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

type CountryProps = {
  country: {
    cca3: string;
    flag_url: string;
    name_common: string;
    name_official: string;
    population: number;
    area: number;
    capital: string;
    region: string;
    lat: number; // Decimal number
    lng: number; // Decimal number
    borders: {
      cca3: string;
      name_common: string;
      flag_url: string;
    }[];
    languages: {
      name: string;
    }[];
  };
};

export default function Country({ country }: CountryProps) {

    console.log(country, 'country')

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800 ">
          Country: {country.name_common}
        </h2>
      }
    >
      <Head title={country.name_common} />

      <div className="py-12">
        <div className="ml-20 mr-20 px-10 sm:px-4">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Flag */}
                <div className="h-64 md:h-full w-full">
                <img
                  src={country.flag_url}
                  alt={`Flag of ${country.name_common}`}
                  className="object-fill w-full h-full object-center"
                />
                </div>

              {/* Details */}
              <div className="p-6 flex flex-col justify-center gap-4 text-gray-800 dark:text-gray-200">
                <div>
                  <h3 className="text-2xl font-bold mb-1">
                    {country.name_common}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Region: {country.region}
                  </p>
                </div>
                <div>
                <h4 className="font-semibold text-lg mb-2">Details</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>
                            <strong>Offical Name:</strong> {country.name_official}
                        </li>
                        <li>
                            <strong>Population:</strong> {country.population.toLocaleString()}
                        </li>
                        <li>
                            <strong>Area:</strong> {country.area.toLocaleString() ?? '0'} km²
                        </li>
                        <li>
                            <strong>Capital:</strong> {country.capital ?? 'N/A'}
                        </li>
                        <li>
                            <strong>Languages:</strong> {country.languages.map((lang => lang.name)).join(', ')}
                        </li>
                    </ul>

                </div>

                <div>
                  <h4 className="font-semibold text-lg mb-2">Location</h4>
                  <div className="h-64 w-full rounded-md overflow-hidden">
                    <iframe
                      src={`https://www.openstreetmap.org/export/embed.html?bbox=${country.lng - 5},${country.lat - 5},${country.lng + 5},${country.lat + 5}&layer=mapnik&marker=${country.lat},${country.lng}`}
                      className="w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      title={`Map of ${country.name_common}`}
                    ></iframe>
                  </div>
                </div>

                {country.borders.length > 0 ? (
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Borders</h4>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {country.borders.map((border, i) => (
                        <li key={i}>
                          <Link
                            href={`/countries/${border.name_common}`}
                            className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition"
                          >
                            <img
                              src={border.flag_url}
                              alt={border.name_common}
                              className="w-5 h-4 object-cover rounded-sm"
                            />
                            <span className="text-sm font-medium">
                              {border.cca3}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                    No bordering countries.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
