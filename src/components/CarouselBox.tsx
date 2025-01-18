import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface Props {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
}

interface CarouselProps {
  data: Props[];
  children: (item: Props) => React.ReactNode;
}

const CarouselBox = ({ data, children }: CarouselProps) => {
  return (
    <Carousel className='w-full'>
      <CarouselContent>
        {data
          ? data.map((item: Props) => (
              <CarouselItem key={item.id} className='basis-1/1'>
                {children(item)}
              </CarouselItem>
            ))
          : null}
      </CarouselContent>
      <div className='hidden md:block'>
        <CarouselPrevious />
        <CarouselNext />
      </div>
    </Carousel>
  );
};
export default CarouselBox;
