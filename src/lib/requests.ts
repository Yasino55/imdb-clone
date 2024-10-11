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
    console.error("Error fetchin data:", { status: 400 });
  }
}

export function posterFormat(poster_path: string) {
  const imageUrl = `http://image.tmdb.org/t/p/w500${poster_path}`;
  return imageUrl;
}

export const formatRating = (rating: number) => {
  return rating.toFixed(1);
};
