import { auth } from "@/auth";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

// Fetch Top movies of the current week
export async function fetchTopMovies() {
  try {
    const res = await fetch(`${apiDomain}/top-movies`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const movies = await res.json();
    return movies.results;
  } catch (error) {
    console.error("Error fetchin data:", { status: 400 });
  }
}

export async function fetchTopShows() {
  try {
    const res = await fetch(`${apiDomain}/top-shows`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const movies = await res.json();
    return movies.results;
  } catch (error) {
    console.error("Error fetching data:", { status: 400 });
  }
}

export async function fetchSingleInfo(id: string, type: string) {
  try {
    const res = await fetch(`${apiDomain}/${type}/${id}`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await res.json();
    return data.tv_results[0] || data.movie_results[0];
  } catch (error) {
    console.error("Error fetching data:", { status: 400 });
    return null;
  }
}

export async function fetchPersonInfo(id: string) {
  try {
    const res = await fetch(`${apiDomain}/person/${id}`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", { status: 400 });
    return null;
  }
}

export async function getExternalId(type: string, id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${type}/${id}/external_ids`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    // console.log(data.wikidata_id);
    return data.wikidata_id;
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
}

export async function searchMoviesAndShows(query: string, path: string) {
  try {
    const res = await fetch(`${apiDomain}/${path}?name=${query}`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function handleSearch(query: string) {
  try {
    const res = await fetch(`${apiDomain}/search?name=${query}`, {
      cache: "no-store",
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export function posterFormat(poster_path: string) {
  const imageUrl = `http://image.tmdb.org/t/p/w500${poster_path}`;
  return imageUrl;
}

export function backdropFormat(backdrop_path: string) {
  const imageUrl = `http://image.tmdb.org/t/p/w1280${backdrop_path}`;
  return imageUrl;
}

export const formatRating = (rating: number) => {
  return rating.toFixed(1);
};
