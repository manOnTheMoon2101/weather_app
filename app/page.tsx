import WeatherData from "./components/WeatherData/weatherData";

export default function Home() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-2.5  w-[500px] h-[500px] max-w-[500px] max-h-[500px] backdrop-blur-[100%]">
      <WeatherData />
    </div>
  );
}
