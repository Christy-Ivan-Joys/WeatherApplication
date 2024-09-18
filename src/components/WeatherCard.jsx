import React from 'react';

const WeatherCard = ({ weatherData, onAddPreferred, onClose, forecastData }) => {
    const { name, main, weather } = weatherData;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
     
    return (
        <div className="relative flex flex-col justify-center items-center max-w-sm mx-auto mt-6 bg-gradient-to-b from-cyan-400 to-blue-500 shadow-md rounded-lg p-4">
            <button
                onClick={onClose}
                className="absolute top-2 right-2 text-white rounded-full p-1 focus:outline-none"
            >
                ✕
            </button>
            <h2 className="text-3xl font-bold mb-2 text-white">{name}</h2>
            <div className="flex flex-col items-center">
                <img src={iconUrl} alt="Weather Icon" className="w-32 h-32" />
                <p className="text-md font-semibold text-white">{weather[0].description}</p>
            </div>
            <p className="text-3xl font-bold text-white">{main.temp}°</p>
            <button
                onClick={onAddPreferred}
                className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 text-white px-4 py-1 rounded-lg mt-4"
            >
                Add to Preferred Cities
            </button>
            {forecastData && (
                <div className="flex-1 flex-col mt-4 ">
                    <h3 className="text-xl font-bold text-white text-center">Recent days</h3>
                    <div className="flex space-x-2 mt-2">
                        {forecastData?.list?.slice(0,3).map((forecast, index) => (
                            <div key={index} className="flex flex-col justify-center items-center bg-black text-white p-2 rounded-lg">
                                <p className="font-semibold text-sm ">{new Date(forecast?.dt * 1000).toLocaleDateString()}</p>
                                <img src={`http://openweathermap.org/img/wn/${forecast?.weather[0]?.icon}.png`} alt="Weather Icon" className="w-12 h-12" />
                                <p className='text-sm'>{forecast?.weather[0]?.description}</p>
                                <p>{forecast?.main?.temp}°</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>

    )
};
export default WeatherCard;