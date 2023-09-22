import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../components/Button";
import { MinifigCard } from "../components/MinifigCard";
import { TEXTS } from "../constants";
import { drawnMinifigsAtom, selectedMinifigAtom } from "../store";

function SelectionView() {
  const navigate = useNavigate();
  const [drawnMinifigs] = useAtom(drawnMinifigsAtom);
  const [selectedMinifig, setSelectedMinifig] = useAtom(selectedMinifigAtom);

  useEffect(() => {
    setSelectedMinifig(RESET);
  }, []);

  // Redirect to home page when user starts from this point
  // (for example by visiting /select directly)
  if (drawnMinifigs.length === 0) {
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-10 py-6 lg:h-full">
      <h1 className="text-2xl font-extrabold uppercase">{TEXTS.selection.title}</h1>
      <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
        {drawnMinifigs?.map((minifig) => (
          <MinifigCard
            key={minifig.set_num}
            name={minifig.name}
            imageUrl={minifig.set_img_url}
            detailsUrl={minifig.set_url}
            onSelect={() => setSelectedMinifig(minifig)}
            selected={minifig.set_num === selectedMinifig?.set_num}
          />
        ))}
      </div>
      <Button onClick={() => navigate("/shipping")} disabled={!selectedMinifig}>
        {TEXTS.selection.buttonLabel}
      </Button>
    </div>
  );
}

export default SelectionView;
