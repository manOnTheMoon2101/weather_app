import WeatherData from "./components/WeatherData/weatherData";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-cyan-500">
      <WeatherData />
    </div>
  );
}
