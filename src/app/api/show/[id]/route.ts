import { getExternalId } from "@/lib/requests";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (request: Request, props: Props) => {
  const params = await props.params;
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  const externalId = await getExternalId("tv", params.id);
  const { external_id, source } = externalId;

  try {
    const show = await fetch(
      `https://api.themoviedb.org/3/find/${external_id}?external_source=${source}`,
      options
    );

    if (!show.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await show.json();
    return new Response(JSON.stringify(data.tv_results[0]), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
};
