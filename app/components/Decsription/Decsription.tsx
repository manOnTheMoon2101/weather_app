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
    ];
    const result2 = findMatch(value, myList2);

    let sceneUrl: string | null = null;

    if (value === "clear sky") {
      sceneUrl =
        "https://draft.spline.design/6YVF9rFIh9M-O92I/scene.splinecode";
    } else if (value === result) {
      sceneUrl =
        "https://draft.spline.design/mUcyW1YpZ0k1hAtX/scene.splinecode";
    } else if (value === result2) {
      sceneUrl =
        "https://draft.spline.design/fU5M7gAGyi0Usmmj/scene.splinecode";
    }

    const timer = setTimeout(() => {
      setSplineScene(sceneUrl);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [value]);

  if (loading) {
    return (
      <div className="flex flex-row justify-end">
        {" "}
        <SkeletonTheme baseColor="#BDE8CA" highlightColor="#0D7C66">
          <Skeleton
            className="flex flex-row justify-end"
            count={1}
            width={200}
            height={100}
          />
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <>
      {splineScene ? (
        <Spline className="flex flex-row justify-end" scene={splineScene} />
      ) : (
        <div>No matching scene found.</div>
      )}
    </>
  );
};

export default Description;
