
type SearchProps = {
    search: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    continents: string[];
    onRegionChange: (region: string) => void;
};


export default function Search(props: SearchProps) {
    const { search, onSearchChange, continents, onRegionChange } = props;
    return (
            <div className="mb-4 flex items-center justify-between">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search by name"
                    className="border rounded px-4 py-2"
                    value={search}
                    onChange={onSearchChange}
                />

                {/* Region Filter Dropdown */}
                <div className="flex items-center">
                    <span className="mr-2">Region:</span>
                    <select
                        className="border rounded px-4 py-2"
                        onChange={(e) => onRegionChange(e.target.value)}
                    >
                        <option value="">All</option>
                        {continents.map((continent: string) => (
                            <option key={continent} value={continent}>
                                {continent}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }