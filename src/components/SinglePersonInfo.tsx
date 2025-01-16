import { posterFormat } from "@/lib/requests";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface Props {
  item: {
    profile_path: string;
    name: string;
    place_of_birth: string;
    birthday: string;
    known_for_department: string;
    biography: string;
  };
}

const SinglePersonInfo = ({ item }: Props) => {
  console.log(item);
  return (
    <>
      <div className='flex flex-col mt-[50px] pb-10 gap-5 md:flex-row md:space-x-10'>
        <div className='flex items-center justify-center'>
          <Image
            src={posterFormat(item.profile_path)}
            alt='Poster'
            width={500}
            height={0}
            className='md:min-w-[350px] max-w-[350px]'
          />
        </div>

        <div className='flex flex-col gap-5 w-full'>
          <h1 className='text-4xl md:text-5xl font-medium'>{item.name}</h1>
          <div className='flex flex-col gap-1'>
            <p>{item.place_of_birth}</p>
            <p>{item.birthday}</p>
            <p>
              {" "}
              {item.known_for_department === "Acting"
                ? "Actor"
                : item.known_for_department}
            </p>
            <div>
              <Accordion
                type='single'
                collapsible
                className={`w-full ${
                  item.biography === "" ? "hidden" : "block"
                }`}
              >
                <AccordionItem value='item-1'>
                  <AccordionTrigger className='text-xl'>
                    Biography
                  </AccordionTrigger>
                  <AccordionContent>{item.biography}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePersonInfo;
