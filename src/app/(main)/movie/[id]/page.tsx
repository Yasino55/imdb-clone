import { fetchSingleInfo } from "@/lib/requests";
import SingleInfo from "@/components/SingleInfo";

interface Props {
  id: string;
}

interface Params {
  params: Props;
}

const MoviePage = async ({ params }: Params) => {
  const movie = await fetchSingleInfo(params.id, "movie");

  return <SingleInfo item={movie} />;
};
export default MoviePage;
