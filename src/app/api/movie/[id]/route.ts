import { getExternalId } from "@/lib/requests";

export const GET = async (request: any, props: any) => {
  const params = await props.params;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  const externalId = await getExternalId("movie", params.id);
  const { external_id, source } = externalId;

  try {
    const movie = await fetch(
      `https://api.themoviedb.org/3/find/${external_id}?external_source=${source}`,
      options
    );

    if (!movie.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await movie.json();
    return new Response(JSON.stringify(data.movie_results[0]), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
};
