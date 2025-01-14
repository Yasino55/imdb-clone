import { fetchSingleInfo } from "@/lib/requests";
import TvShowInfoPage from "@/components/shows/TvShowInfoPage";

interface Props {
  id: string;
}

interface Params {
  params: Promise<Props>;
}

const ShowPage = async (props: Params) => {
  const params = await props.params;
  const show = await fetchSingleInfo(params.id, "show");
  return <TvShowInfoPage item={show} />;
};
export default ShowPage;
