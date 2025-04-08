import { Link } from '@inertiajs/react';

type Country = {
    cca3: string;
    name_common: string;
    flag_url: string;
    region: string;
};

type CountryProps = {
    country: Country[];
};


const ShowCountries: React.FC<CountryProps> = ({ country }) => {
    return (
        <>
            {country.map((singleCountry) => (
                <div key={singleCountry.cca3}>
                    <Link href={`/countries/${singleCountry.name_common}`} >
                        <article className="bg-white hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 rounded-lg shadow overflow-hidden">
                            <img src={singleCountry.flag_url} alt={singleCountry.name_common} className="md:h-64 w-full object-cover" />
                            <div className="p-4">
                                <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                    {singleCountry.name_common}
                                </h2>
                                <ul className="flex flex-col items-start justify-start gap-2 dark:text-gray-400">
                                    <li>Region: {singleCountry.region}</li>
                                </ul>
                            </div>
                        </article>
                    </Link>

                </div>
            ))}
        </>
    );
}

export default ShowCountries;