// import Paginate from 'Pagination'; // Uncomment and correct if 'Pagination' is the intended module



type Country = {
    cca3: string;
    name_common: string;
    flag_url: string;
    region: string;
  };
  
  type TableProps = {
    countries: Country[];
  };
  
  const Table: React.FC<TableProps> = ({ countries }) => {
    return (
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <th className="px-4 py-3">CCA3</th>
            <th className="px-4 py-3">Flag</th>
            <th className="px-4 py-3">Country</th>
            <th className="px-4 py-3">Region</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
          {countries.map((country, index) => (
            <tr key={index} className="text-gray-700 dark:text-gray-400">
              <td className="px-4 py-3 text-sm">{country.cca3}</td>

              <td className="px-4 py-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={country.flag_url}
                  alt={country.name_common}
                  loading="lazy"
                />
              </td>
              <td className="px-4 py-3 font-semibold">{country.name_common}</td>
              <td className="px-4 py-3 text-sm">{country.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    );
  };

  export default Table;