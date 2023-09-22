import { useAtom } from "jotai";
import sampleSize from "lodash.samplesize";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import questionMark from "../assets/questionMark.svg";
import { Button } from "../components/Button";
import { TEXTS } from "../constants";
import { useGetMiniFigs } from "../hooks/useGetMinifigs";
import { drawnMinifigsAtom } from "../store";

function HomeView() {
  const navigate = useNavigate();
  const [_drawnMinifigs, setDrawnMinifigs] = useAtom(drawnMinifigsAtom);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { data, isLoading, error } = useGetMiniFigs(shouldFetch);

  useEffect(() => {
    if (data?.results) {
      const drawn = sampleSize(data.results, 3);
      setDrawnMinifigs(drawn);
      navigate("/select");
    }
  }, [data?.results]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 px-4 text-center">
      <img src={questionMark} alt="question mark icon" className="absolute -z-10 opacity-10" />
      <h1 className="text-4xl font-extrabold uppercase">{TEXTS.home.title}</h1>
      <Button onClick={() => setShouldFetch(true)}>
        {isLoading ? TEXTS.home.buttonLabelLoading : TEXTS.home.buttonLabel}
      </Button>
      {error ? <p className="text-sm text-red-400">{TEXTS.home.error}</p> : null}
    </div>
  );
}

export default HomeView;
