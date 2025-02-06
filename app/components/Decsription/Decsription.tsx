"use client";

import Spline from "@splinetool/react-spline";
import { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface DescriptionProps {
  value: string;
}

const Description: React.FC<DescriptionProps> = ({ value }) => {
  const [loading, setLoading] = useState(true);
  const [splineScene, setSplineScene] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const findMatch = (y: string, list: string[]): string | null => {
      for (let i = 0; i < list.length; i++) {
        if (y === list[i]) {
          return list[i];
        }
      }
      return null;
    };

    const myList = [
      "light rain",
      "moderate rain",
      "heavy intensity rain",
      "very heavy rain",
      "extreme rain",
      "freezing rain",
      "light intensity shower rain",
      "shower rain",
      "heavy intensity shower rain",
      "ragged shower rain",
    ];
    const result = findMatch(value, myList);

    const myList2 = [
      "scattered clouds",
      "few clouds",
      "mist",
      "broken clouds",
      "overcast clouds",
      "haze",
    ];
    const result2 = findMatch(value, myList2);

    let sceneUrl: string | null = null;

    if (value === "clear sky") {
      sceneUrl =
        "https://draft.spline.design/6YVF9rFIh9M-O92I/scene.splinecode";
    } else if (value === result) {
      sceneUrl = "https://prod.spline.design/qdxaAmInr8iXbeje/scene.splinecode";
    } else if (value === result2) {
      sceneUrl = "https://prod.spline.design/lioj8FyaRlXlt1sl/scene.splinecode";
    }

    const timer = setTimeout(() => {
      setSplineScene(sceneUrl);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  if (loading) {
    return (
      <div className="flex flex-row justify-center">
        {" "}
        <SkeletonTheme baseColor="#fde68a" highlightColor="#fca5a5">
          <Skeleton
            className="flex flex-row justify-center"
            count={1}
            width={200}
            height={100}
          />
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="h-[250px]">
      {splineScene ? (
        <Spline className="flex flex-row justify-center" scene={splineScene} />
      ) : (
        <div>No matching scene found.</div>
      )}
    </div>
  );
};

export default Description;
