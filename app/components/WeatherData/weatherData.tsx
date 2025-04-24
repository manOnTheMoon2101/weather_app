"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Averia_Sans_Libre } from "next/font/google";
import { CiSearch } from "react-icons/ci";
import Description from "../Decsription/Decsription";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Badge } from "@/components/ui/badge";
import { WiStrongWind } from "react-icons/wi";
import cities from "../../../data/cities.json";
import Flag from "react-world-flags";
import {
  Building2,
  Info,
  Ruler,
  Sunrise,
  Sunset,
  Thermometer,
  Wind,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const averia = Averia_Sans_Libre({
  subsets: ["latin"],
  weight: "400",
});
function WeatherData() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const prod = "api/weather/";
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.get(`${prod}${city}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  function formatUnixTime(unixTimestamp: any) {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  }
  const currentDate = new Date(Date.now());
  const isoString = currentDate.toDateString();
  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
  };

  const [open, setOpen] = useState<boolean>(false);
  return (
    <div>
      {isLoading ? (
        <div>
          <SkeletonTheme baseColor="#2DD4BF" highlightColor="#FEF9c3">
            <Skeleton count={1} width={200} height={20} />
          </SkeletonTheme>
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <div className="relative m-5 w-[300px] flex mx-auto">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-start w-full bg-teal-400 border-yellow-100 font-bold"
                  >
                    <Building2 className="mr-2 text-yellow-100" />
                    {city ? (
                      cities.find((x) => x.value === city)?.name
                    ) : (
                      <span>Search City...</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2.5 bg-yellow-100">
                  <Command>
                    <CommandInput placeholder="Search City..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup className="w-full bg-yellow-100">
                        {cities.map((x) => (
                          <CommandItem
                            key={x.value}
                            value={x.value}
                            onSelect={(currentValue) => {
                              setCity(
                                currentValue === city ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <div className="flex flex-row justify-between w-full">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src={x.url} />
                                <AvatarFallback>{x.country}</AvatarFallback>
                              </Avatar>
                              <p className="text-black font-bold">{x.name}</p>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          </form>
          {weatherData ? (
            <div>
              <h2
                className={`text-center text-4xl text-white flex flex-row justify-center items-center ${averia.className}`}
              >
                <Flag
                  code={weatherData.sys.country}
                  className="w-[50px] h-[25px] mr-2"
                  fallback={<span>Unknown</span>}
                />
                {weatherData.name}
              </h2>

              <Description value={weatherData.weather[0].description} />

              <div className="flex flex-col items-baseline">
                <h3
                  className={`${averia.className} font-bold text-2xl flex flex-row items-center`}
                >
                  <Info className="mr-2 text-yellow-100" />
                  Description
                </h3>
                <Badge
                  className={`${averia.className} text-2xl bg-red-400 text-white m-1`}
                >
                  {weatherData.weather[0].description}
                </Badge>
                <div className="mt-2">
                  <h3
                    className={`${averia.className} font-bold text-2xl flex flex-row items-center`}
                  >
                    <Thermometer className="mr-2 text-yellow-100" />
                    Temperature
                  </h3>
                  <Badge className="bg-blue-300 text-white text-2xl  m-1">
                    Min {weatherData.main.temp_min}°C
                  </Badge>
                  <Badge className="bg-orange-300 text-white text-2xl  m-1">
                    Main {weatherData.main.temp}°C
                  </Badge>
                  <Badge className="bg-red-300 text-white text-2xl  m-1">
                    Max {weatherData.main.temp_max}°C
                  </Badge>

                  <span className="text-yellow-100 italic m-2">
                    Feels Like {weatherData.main.feels_like}°C...
                  </span>
                </div>
                <div className="mt-2">
                  <h3
                    className={`${averia.className} font-bold text-2xl flex flex-row items-center`}
                  >
                    <Ruler className="mr-2 text-yellow-100" />
                    Sea Level & Humidity
                  </h3>
                  <Badge className="bg-teal-400 text-white text-2xl  m-1">
                    Sea Level {weatherData.main.sea_level}
                  </Badge>
                  <Badge className="bg-teal-400 text-white text-2xl  m-1">
                    Humidity {weatherData.main.humidity}
                  </Badge>
                </div>
                <div className="mt-2">
                  <h3
                    className={`${averia.className} font-bold text-2xl flex flex-row items-center`}
                  >
                    <Wind className="mr-2 text-yellow-100" />
                    Wind
                  </h3>
                  <Badge className="bg-violet-400 text-white text-2xl  m-1">
                    Speed {weatherData.wind.speed}
                  </Badge>
                  <Badge className="bg-violet-400 text-white text-2xl  m-1">
                    Degree {weatherData.wind.deg}
                  </Badge>
                </div>
                <div className="mt-2  w-full flex flex-row justify-between">
                  <div>
                    <h3
                      className={`${averia.className} font-bold text-2xl flex flex-row items-center`}
                    >
                      <Sunrise className="mr-2 text-yellow-100" />
                      Sunrise
                    </h3>
                    <p className={`${averia.className} m-1 text-xl text-white`}>
                      {formatUnixTime(weatherData.sys.sunrise)} UTC +2 hours
                    </p>
                  </div>
                  <div>
                    <h3
                      className={`${averia.className} font-bold text-2xl flex flex-row items-center`}
                    >
                      <Sunset className="mr-2 text-yellow-100" />
                      Sunset
                    </h3>
                    <p className={`${averia.className} m-1 text-xl text-white`}>
                      {formatUnixTime(weatherData.sys.sunset)} UTC +2 hours
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex flex-row justify-end">
                <Badge
                  className={`${averia.className} m-1 text-xl text-black bg-white`}
                >
                  {isoString}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2
                className={`${averia.className} text-center text-yellow-100 text-6xl sm:text-8xl tracking-wide`}
              >
                Hey!
              </h2>
              <p
                className={`${averia.className} text-center text-white text-2xl md:text-4xl tracking-tight`}
              >
                Pop your favorite city into the search bar up there
                <br /> let's vibe! 😎🔥
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherData;
