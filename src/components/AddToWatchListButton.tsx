"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
  const { data: session } = useSession();
  const router = useRouter();

  // Fetch watch list status when the component mounts
  useEffect(() => {
    if (!session) return;
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
        }
      } catch (error) {
        console.error("Error checking watch list status:", error);
      }
    };

    checkWatchlist();
  }, [item.id, session]);

  const handleWatchlist = async () => {
    try {
      if (!session) {
        router.push("/sign-in");
        return;
      }
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
          console.error("Error removing from watch list.");
        }
      }
    } catch (error) {
      console.error("Error updating watch list.", error);
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
