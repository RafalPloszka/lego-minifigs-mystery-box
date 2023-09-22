import { TEXTS } from "../constants";
import { useGetMinifigParts } from "../hooks/useGetMinifigParts";
import { Minifig } from "../types";
import { Button } from "./Button";
import { ImageFallback } from "./ImageFallback";
import { PartDetails } from "./PartDetails";
import { Skeleton } from "./Skeleton";

interface SummaryProps {
  selectedMinifig: Minifig;
  onSubmit: () => void;
  isSubmitDisabled: boolean;
}

export const Summary = ({ selectedMinifig, onSubmit, isSubmitDisabled }: SummaryProps) => {
  const { data, isLoading, error } = useGetMinifigParts(selectedMinifig?.set_num);

  const partsData = data?.results.map((result) => result.part);

  return (
    <div className="flex h-full w-full flex-col rounded-2xl bg-white p-6 text-black">
      <h2 className="mb-12 text-3xl font-extrabold uppercase">{TEXTS.shipping.summary}</h2>
      <div className="mb-10 flex flex-col items-center gap-4">
        {selectedMinifig.set_img_url ? (
          <img src={selectedMinifig.set_img_url} className="h-36 w-36" />
        ) : (
          <ImageFallback className="h-36 w-36" />
        )}
        <span className="font-medium">{selectedMinifig.name}</span>
      </div>
      <p>{selectedMinifig?.set_num}</p>
      {error ? <p className="text-sm text-red-400">{TEXTS.shipping.error}</p> : null}

      {isLoading ? <Skeleton /> : null}

      {partsData ? (
        <>
          <p className="font-medium">There are {partsData.length} parts in this minifig:</p>
          <div data-testid="parts-wrapper" className="overflow-y-auto">
            {partsData.map((part) => (
              <PartDetails
                key={part.part_num}
                name={part.name}
                imageUrl={part.part_img_url}
                partNumber={part.part_num}
              />
            ))}
          </div>
        </>
      ) : null}

      <Button onClick={onSubmit} disabled={isSubmitDisabled} className="mt-10 w-60 self-center text-white">
        {TEXTS.shipping.buttonLabel}
      </Button>
    </div>
  );
};
