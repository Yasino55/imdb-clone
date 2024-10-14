import { fetchSingleInfo } from "@/lib/requests";
import SingleInfo from "@/components/SingleInfo";

interface Props {
  id: string;
}

interface Params {
  params: Props;
}

const ShowPage = async ({ params }: Params) => {
  const show = await fetchSingleInfo(params.id, "show");
  return <SingleInfo item={show} />;
};
export default ShowPage;
