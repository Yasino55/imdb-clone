import { NextRequest } from "next/server";
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const type = searchParams.get("type");

  if (!id) {
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      { status: 400 }
    );
  }

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/person/${id}/${type}_credits?language=en-US`,
      options
    );

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
