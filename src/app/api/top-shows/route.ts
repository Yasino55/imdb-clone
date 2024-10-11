export const GET = async () => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/tv/week?language=en-US`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
};
