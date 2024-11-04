import { favorite } from "@/lib/dbRequests";
import { useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";

interface Props {
  item: {
    id: number;
    title?: string;
    name?: string;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    media_type?: string;
  };
}

const FavoriteButton = ({ item }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = async () => {
    const test = await favorite();
    console.log(test);
    try {
      if (isFavorite) {
      }
    } catch (error) {}
  };
  return (
    <button onClick={handleFavorite}>
      {isFavorite ? (
        <FaCheck className='text-primary text-xl' />
      ) : (
        <FaPlus className='text-xl' />
      )}
    </button>
  );
};
export default FavoriteButton;
