import { getExternalId } from "@/lib/requests";

export const GET = async (request: any, { params }: any) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  const externalId = await getExternalId("tv", params.id);

  try {
    const show = await fetch(
      `https://api.themoviedb.org/3/find/${externalId}?external_source=wikidata_id`,
      options
    );

    if (!show.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await show.json();
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
