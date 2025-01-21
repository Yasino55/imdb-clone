import { prisma } from "@/prisma";
import { format } from "date-fns";
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

// Fetch Top movies of the current week
export async function fetchTopMovies() {
  try {
    const res = await fetch(`${apiDomain}/top-movies`, {
      next: { revalidate: 3600 },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const movies = await res.json();
    return movies.results;
  } catch (error) {
    console.log(error);
    console.error("Error fetching data:", { status: 400 });
    return null;
  }
}

export async function fetchCast(id: string, type: string) {
  const options = {
    headers: {
      method: "GET",
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const res = await fetch(`${apiDomain}/cast?id=${id}&type=${type}`, options);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.cast;
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
}

export async function fetchTopShows() {
  try {
    const res = await fetch(`${apiDomain}/top-shows`, {
      next: { revalidate: 3600 },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("failed to fetch data");
    }

    const movies = await res.json();
    return movies.results;
  } catch (error) {
    console.log(error);
    console.error("Error fetching data:", { status: 400 });
    return null;
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
    return data;
  } catch (error) {
    console.log(error);
    console.error("Error fetching data:", { status: 400 });
  }
}

export async function fetchTvSeasons(id: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.seasons;
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
}

export async function fetchTvEpisodes(id: string, seasonNumber: string) {
  const options = {
    headers: {
      method: "GET",
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const res = await fetch(
      `${apiDomain}/tvEpisodes?id=${id}&season=${seasonNumber}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.episodes;
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
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
    console.log(error);
    console.error("Error fetching data:", { status: 400 });
  }
}

export async function fetchPersonCredits(id: string, type: string) {
  const options = {
    headers: {
      method: "GET",
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  try {
    const res = await fetch(
      `${apiDomain}/person/credits?id=${id}&type=${type}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.cast;
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
}

export async function getWatchList(id: string) {
  const data = await prisma.favorite.findMany({
    where: {
      userId: id,
    },
  });

  return JSON.parse(JSON.stringify(data));
}

export async function fetchMovieAndTvDetails(id: string, type: string) {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: process.env.TMDB_BEARER_KEY as string,
      cache: "no-store",
    },
  };

  const externalId = await getExternalId(type, id);
  const { external_id, source } = externalId;

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/find/${external_id}?external_source=${source}`,
      options
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data.tv_results[0] || data.movie_results[0];
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch external id");
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

    if (data.wikidata_id === null) {
      return { source: "imdb_id", external_id: data.imdb_id };
    } else {
      return { source: "wikidata_id", external_id: data.wikidata_id };
    }
  } catch (error) {
    console.log(error);
    throw new Error("failed to fetch external id");
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

export const formatDate = (date: string) => {
  return format(new Date(date), "dd-MMM-yyyy").replace(/-/g, " ");
};
