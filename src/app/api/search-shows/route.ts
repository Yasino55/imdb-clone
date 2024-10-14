// import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/tv?query=${name}&include_adult=false&language=en-US&page=1`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data.results), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch data", { status: 500 });
  }
}
