import { fetchSingleInfo } from "@/lib/requests";
import SingleInfo from "@/components/SingleInfo";

interface Props {
  id: string;
}

interface Params {
  params: Promise<Props>;
}

const MoviePage = async (props: Params) => {
  const params = await props.params;
  const movie = await fetchSingleInfo(params.id, "movie");

  return <SingleInfo item={movie} />;
};
export default MoviePage;
