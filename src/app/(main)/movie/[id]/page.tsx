import { fetchSingleInfo } from "@/lib/requests";
import MovieInfoPage from "@/components/movies/MovieInfoPage";

interface Props {
  id: string;
}

interface Params {
  params: Promise<Props>;
}

const MoviePage = async (props: Params) => {
  const params = await props.params;
  const movie = await fetchSingleInfo(params.id, "movie");

  return <MovieInfoPage item={movie} />;
};
export default MoviePage;
