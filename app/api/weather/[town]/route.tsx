
import { NextResponse } from "next/server";

export const GET = async (
  requests: any,
  { params }: { params: { town: string } }
) => {
  try {
    const { town } = params;
    const apiKey = process.env.API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${town}&units=metric&appid=${apiKey}`,
      {
        next: { revalidate: 900 },
      }
    )
  
    if (!res.ok) {
      throw new Error("Failed to fetch data")
    }
  
    const data = await res.json()
  
    return Response.json(data)
  } catch (err) {
    return NextResponse.json(
      {
        message: "GET Error",
        err,
      },
      { status: 500 }
    );
  }
};
