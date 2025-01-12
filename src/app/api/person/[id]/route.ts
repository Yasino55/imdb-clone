export const GET = async (request: any, props: any) => {
  const params = await props.params;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const movie = await fetch(
      `https://api.themoviedb.org/3/person/${params.id}?language=en-US`,
      options
    );

    if (!movie.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await movie.json();
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
