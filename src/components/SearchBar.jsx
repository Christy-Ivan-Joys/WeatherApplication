import React, { useState } from 'react';

const SearchBar = ({ onSearch, toggleUnit, unit }) => {
    
    const [city, setCity] = useState('');
    const handleSearch = () => {
        if (city){
            onSearch(city);
            setCity('');
        }
    };
    
    return (
        <div className="flex flex-col items-center bg-white shadow-md rounded-lg mb-6 w-full max-w-md mx-auto p-1">
            <div className="flex w-full space-x-1">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 rounded-full w-full focus:outline-none"
                    placeholder="Enter city"
                />
                <button className='text-white p-3 bg-zinc-900 rounded-lg' onClick={toggleUnit}>
                    <span className='font-semibold'>{unit === 'metric' ? '°C' : '°F'}</span></button>
                <button
                    onClick={handleSearch}
                    className="bg-black text-white px-5 py-2 rounded-lg transition-all duration-200"
                >
                    Search
                </button>
            </div>
        </div>


    );
};

export default SearchBar;
