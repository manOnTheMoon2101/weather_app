"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Averia_Sans_Libre } from "next/font/google";
import { CiSearch } from "react-icons/ci";
import Description from "../Decsription/Decsription";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
const averia = Averia_Sans_Libre({
  subsets: ["latin"],
  weight: "400",
});
function WeatherData() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
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
    fetchData();
  }, []);

  const handleInputChange = (e: any) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative m-5 w-[300px] flex mx-auto">
          <Input
            type="text"
            placeholder="Enter city name..."
            value={city}
            className="w-full p-2.5 text-base border border-gray-300 rounded-md box-border rounded border-white border-4 bg-orange-600 text-white"
            onChange={handleInputChange}
          />
          {/* <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {value
                  ? frameworks.find((framework) => framework.value === value)
                      ?.label
                  : "Select framework..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {frameworks.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover> */}
          <button
            className="border-none text-2xl bg-transparent absolute top-1/2 right-2.5 transform -translate-y-1/2 cursor-pointer text-white"
            type="submit"
          >
            <CiSearch />
          </button>
        </div>
      </form>
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-4  backdrop-blur-sm w-[500px] h-[500px] max-w-[500px] max-h-[500px]">
          <SkeletonTheme baseColor="#500724" highlightColor="#FABC3F">
            <Skeleton
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              count={1}
              width={200}
            />
          </SkeletonTheme>
        </div>
      ) : (
        <div></div>
      )}
      {weatherData ? (
        <div className="m-10">
          <h2 className={`text-center text-4xl`}>{weatherData.name}</h2>

          <Description value={weatherData.weather[0].description} />

          <div className="m-5 flex flex-col items-baseline">
            <Badge
              className={`${averia.className} text-2xl bg-fuchsia-800 text-white m-1`}
            >
              {weatherData.weather[0].description}
            </Badge>
            <Badge className="bg-pink-800 text-white text-2xl  m-1">
              {weatherData.main.temp}°C
            </Badge>
            <p className={`${averia.className} m-1 text-xl`}>
              {isoString}
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center m-10">
          <h2
            className={`${averia.className} text-center text-black text-6xl sm:text-8xl tracking-wide`}

          >
            Welcome
            {/* <span>👋</span> */}
          </h2>
          <p
            className={`${averia.className} text-center text-white text-2xl md:text-4xl tracking-tight`}

          >
            Enter you designated city<br/> in
            the search bar on top.
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherData;
