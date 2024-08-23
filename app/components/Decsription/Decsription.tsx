"use client";

import { useState } from "react";
import Spline from "@splinetool/react-spline";
import styles from "../../page.module.css";
function Description(value: any) {
  function findMatch(y: any, list: any) {
    for (let i = 0; i < list.length; i++) {
      if (y === list[i]) {
        return list[i];
      }
    }
    return null;
  }

  let myList = [
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
  let result = findMatch(value.value, myList);

  let myList2 = [
    "scattered clouds",
    "few clouds",
    "mist",
    "broken clouds",
    "overcast clouds",
  ];
  let result2 = findMatch(value.value, myList2);

  let x;

  if (value.value == "clear sky") {
    x = (
      <Spline
        className="flex flex-row justify-end"
        scene="https://draft.spline.design/6YVF9rFIh9M-O92I/scene.splinecode"
      />
    );
  } else if (value.value == result) {
    x = (
      <Spline
        className="flex flex-row justify-end"
        scene="https://draft.spline.design/mUcyW1YpZ0k1hAtX/scene.splinecode"
      />
    );
  } else if (value.value == result2) {
    x = (
      <Spline
        className="flex flex-row justify-end"
        scene="https://draft.spline.design/fU5M7gAGyi0Usmmj/scene.splinecode"
      />
    );
  }

  return <>{x}</>;
}

export default Description;
