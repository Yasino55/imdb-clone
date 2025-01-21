export const GET = async () => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US`,
      { ...options, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-control": "s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
};
