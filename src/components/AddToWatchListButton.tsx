import { favorite } from "@/lib/dbRequests";
import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { set } from "zod";

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

const WatchListButton = ({ item }: Props) => {
  const [isWatchList, setIsWatchList] = useState(false);
  const [error, setError] = useState("");

  // Fetch watchlist status when the component mounts
  useEffect(() => {
    const checkWatchlist = async () => {
      try {
        const response = await fetch(`/api/watch-list?itemId=${item.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setIsWatchList(data.isInWatchList);
        } else {
          const errorData = await response.json();
          if (response.status === 401) {
            setError("Please log in to view your watchlist.");
          } else {
            setError(errorData.message || "Error checking watchlist status.");
          }
        }
      } catch (error) {
        console.error("Error checking watchlist status:", error);
      }
    };

    checkWatchlist();
  }, [item.id]);

  const handleWatchlist = async () => {
    try {
      if (!isWatchList) {
        const response = await fetch("/api/watch-list", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: item.id,
            itemType: item.media_type,
          }),
        });
        if (response.ok) {
          setIsWatchList(true);
          setError("");
        } else {
          const errorData = await response.json();
          setError(errorData.message);
          // console.log(error);
        }
      } else {
        const response = await fetch("/api/watch-list", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: item.id,
          }),
        });

        if (response.ok) {
          setIsWatchList(false);
        } else {
          console.error("Error removing from watchlist.");
        }
      }
    } catch (error) {
      console.error("Error updating watchlist.");
    }
  };

  return (
    <button onClick={handleWatchlist}>
      {isWatchList ? (
        <FaCheck className='text-primary text-xl' />
      ) : (
        <FaPlus className='text-xl' />
      )}
    </button>
  );
};
export default WatchListButton;
