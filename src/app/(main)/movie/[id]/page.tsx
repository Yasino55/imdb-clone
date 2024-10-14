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

  return (
    <div className='container mx-auto'>
      <SingleInfo item={movie} />
    </div>
  );
};
export default MoviePage;
