import React from 'react';

const PreferredCitiesList = ({ cities, onCitySelect, onCityRemove }) => {

    return (

        <div className="flex flex-wrap space-x-2 max-w-sm mx-auto mt-6">
            {cities?.map((city) => (
                <div
                    key={city}
                    className="flex items-center bg-black text-white rounded-full px-3 py-1 mb-2 space-x-2 border-2 border-white 
                    transition-colors duration-200 hover:bg-white hover:text-black"
                >
                    <span
                        className="cursor-pointer transition-colors duration-200"
                        onClick={() => onCitySelect(city)}
                    >
                        {city}
                    </span>
                    <button
                        className="text-white hover:text-black transition-colors duration-200 focus:outline-none"
                        onClick={() => onCityRemove(city)}
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>


    );
};

export default PreferredCitiesList;
