import { fetchPersonInfo } from "@/lib/requests";
import SinglePersonInfo from "@/components/SinglePersonInfo";

interface Props {
  id: string;
}

interface Params {
  params: Promise<Props>;
}

const MoviePage = async (props: Params) => {
  const params = await props.params;
  const data = await fetchPersonInfo(params.id);

  return <SinglePersonInfo item={data} key={data.id} />;
};
export default MoviePage;
