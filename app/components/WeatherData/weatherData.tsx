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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
const averia = Averia_Sans_Libre({
  subsets: ["latin"],
  weight: "400",
});
function WeatherData() {
  const [city, setCity] = useState("");
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
          <SkeletonTheme baseColor="#fde68a" highlightColor="#fca5a5">
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
                    className="justify-between w-full bg-amber-200 font-bold"
                  >
                    {city
                      ? cities.find((x) => x.value === city)?.name
                      : "Select City..."}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-2.5 bg-amber-200">
                  <Command>
                    <CommandInput placeholder="Search City..." />
                    <CommandList>
                      <CommandEmpty>No city found.</CommandEmpty>
                      <CommandGroup className="w-full bg-amber-200">
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
                              <p className="text-purple-900 font-bold">
                                {x.name}
                              </p>
                              {/* <Badge className={`${averia.className} text-2xl bg-red-400 text-white m-1`}>
                            {x.country}
                            </Badge> */}
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {/* <Button
                variant="ghost"
                className="border-none text-2xl bg-transparent absolute top-1/2 right-2.5 transform -translate-y-1/2 cursor-pointer text-black"
                type="submit"
              >
                <CiSearch />
              </Button> */}
            </div>
          </form>
          {weatherData ? (
            <div>
              <h2
                className={`text-center text-4xl text-white flex flex-row justify-center items-center ${averia.className}`}
              >
                <Flag
                  code={weatherData.sys.country}
                  style={{ width: "50px", height: "25px" }}
                  fallback={<span>Unknown</span>}
                />
                {weatherData.name}
              </h2>

              <Description value={weatherData.weather[0].description} />

              <div className="flex flex-col items-baseline">
                <Badge
                  className={`${averia.className} text-2xl bg-red-400 text-white m-1`}
                >
                  {weatherData.weather[0].description}
                </Badge>
                <Badge className="bg-orange-300 text-white text-2xl  m-1">
                  {weatherData.main.temp}°C
                </Badge>
                <Badge className="bg-purple-900 text-white text-2xl  m-1">
                  {weatherData.wind.speed}
                  <WiStrongWind />
                </Badge>
                <p className={`${averia.className} m-1 text-xl text-white`}>
                  {isoString}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2
                className={`${averia.className} text-center text-black text-6xl sm:text-8xl tracking-wide`}
              >
                Welcome
                {/* <span>👋</span> */}
              </h2>
              <p
                className={`${averia.className} text-center text-white text-2xl md:text-4xl tracking-tight`}
              >
                Enter you designated city
                <br /> in the search bar on top.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default WeatherData;
