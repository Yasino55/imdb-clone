import { fetchTopShows } from "@/lib/requests";
import CardInfo from "@/components/CardInfo";
import CarouselBox from "@/components/CarouselBox";
import Link from "next/link";

const TopShowsCarousel = async () => {
  const data = await fetchTopShows();
  const showsData = data.slice(0, 10);

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <h3 className='text-muted-foreground text-xl font-semibold'>
          Top 10 Shows This Week
        </h3>
        <Link className='text-primary underline' href='/top-trending-shows'>
          View All
        </Link>
      </div>
      <div>
        <CarouselBox data={showsData}>
          {(show) => <CardInfo item={show} />}
        </CarouselBox>
      </div>
    </div>
  );
};
export default TopShowsCarousel;
