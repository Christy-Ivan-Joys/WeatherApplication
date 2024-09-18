import axios from 'axios';
import SearchBar from './components/SearchBar';
import { useEffect, useState } from 'react';
import WeatherCard from './components/WeatherCard';
import PreferredCitiesList from './components/PreferredCityList';
import CircularProgress from '@mui/material/CircularProgress';

function App() {

  const [unit, setUnit] = useState('metric');
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [preferredCities, setPreferredCities] = useState([]);
  const [forecastData, setForecastData] = useState(null);
  const apiKey = '9fa35574d233f26e06d1ccae1585be68'

  useEffect(() => {
    setLoading(true)
    const savedCities = JSON.parse(localStorage.getItem('preferredCities')) || [];
    setPreferredCities(savedCities);
    setLoading(false)
  }, []);

  const fetchWeather = async (city) => {
    try {
      setLoading(true)
      setError('')
      const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`)
      const forecastResult = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`);
      console.log(forecastResult.data)
      setForecastData(forecastResult.data);
      console.log(result, 'this is data')
      setWeatherData(result?.data)
      setLoading(false)
    } catch (error) {
      setError('Invalid city name or network error !')
      setLoading(false)
    }
  }

  const handleAddPreferredCity = (city) => {
    if (!preferredCities.includes(city)) {
      const updatedCities = [...preferredCities, city];
      setPreferredCities(updatedCities);
      localStorage.setItem('preferredCities', JSON.stringify(updatedCities));
    }
  }

  const handleRemovePreferredCity = (city) => {
    const updatedCities = preferredCities.filter((c) => c !== city);
    setPreferredCities(updatedCities);
    localStorage.setItem('preferredCities', JSON.stringify(updatedCities));
  };

  const handleSearch = (city) => {
    fetchWeather(city)
  }

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
    if (weatherData) {
      fetchWeather(weatherData.name);
    }
  };
  const onClose = () => {
    setWeatherData(null)
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-black ">
      <h1 className="text-3xl font-bold mb-6 text-zinc-400">Weather Forecast App</h1>
      <div className='border-2 border-white p-4 rounded-lg'>
        <SearchBar onSearch={handleSearch} toggleUnit={toggleUnit} unit={unit} />
        {error ? <p className="text-red-500 text-center">{error}</p> : ''}
        {loading ? (
          <div className='flex justify-center items-center'>
            <CircularProgress />
          </div>
        ) : (
          weatherData && (
            <WeatherCard
              weatherData={weatherData}
              forecastData={forecastData}
              onClose={onClose}
              onAddPreferred={() => handleAddPreferredCity(weatherData.name)}
            />
          )
        )}
        <PreferredCitiesList
          cities={preferredCities}
          onCitySelect={fetchWeather}
          onCityRemove={handleRemovePreferredCity}
        />
      </div>
    </div>
  );
}

export default App;
