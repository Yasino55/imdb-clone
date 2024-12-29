import { fetchSingleInfo } from "@/lib/requests";
import SingleInfo from "@/components/SingleInfo";

interface Props {
  id: string;
}

interface Params {
  params: Promise<Props>;
}

const ShowPage = async (props: Params) => {
  const params = await props.params;
  const show = await fetchSingleInfo(params.id, "show");
  return <SingleInfo item={show} />;
};
export default ShowPage;
