"use client";

import { useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import TvSeasons from "./TvSeasons";
import TvShowCast from "./TvShowCast";

interface Seasons {
  season_number: string;
}

interface Props {
  data: Seasons[];
  id: string;
}

const ToggleCastSeasons = ({ data, id }: Props) => {
  const [selectedType, setSelectedType] = useState<string>("seasons");

  return (
    <div>
      <ToggleGroup
        type='single'
        value={selectedType}
        onValueChange={(value) => {
          setSelectedType(value);
        }}
      >
        <ToggleGroupItem value='seasons'>Seasons & Episodes</ToggleGroupItem>
        <ToggleGroupItem value='Cast'>Cast</ToggleGroupItem>
      </ToggleGroup>
      <div className='h-[1500px]'>
        {selectedType === "seasons" ? (
          <TvSeasons id={id} data={data} />
        ) : (
          <TvShowCast id={id} />
        )}
      </div>
    </div>
  );
};

export default ToggleCastSeasons;
