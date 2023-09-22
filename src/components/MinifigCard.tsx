import { TEXTS } from "../constants";
import { ImageFallback } from "./ImageFallback";

interface MinifigCardProps {
  name: string;
  imageUrl: string | null;
  detailsUrl: string;
  onSelect: () => void;
  selected?: boolean;
}

export const MinifigCard = ({ name, imageUrl, detailsUrl, onSelect, selected }: MinifigCardProps) => {
  console.log(imageUrl);
  return (
    <div
      onClick={onSelect}
      className={`flex aspect-square w-72 cursor-pointer flex-col items-center justify-between rounded-xl bg-white px-6 py-4 lg:w-96 lg:px-12 lg:py-8 ${
        selected ? "shadow-[0px_0px_4px_5px_#f6ad55]" : ""
      } `}
    >
      {imageUrl ? (
        <img src={imageUrl} className="h-60 w-auto" alt="minifig" />
      ) : (
        <ImageFallback className="h-60 w-60" />
      )}
      <span className="text-center text-sm font-bold text-black">{name}</span>
      <a
        href={detailsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="select-none text-sm font-bold text-orange-400 hover:text-orange-500"
      >
        {TEXTS.selection.showDetails}
      </a>
    </div>
  );
};
