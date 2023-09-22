import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Atom, Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { TEXTS } from "../../constants";
import { drawnMinifigsAtom } from "../../store";
import { Minifig } from "../../types";
import SelectionView from "../../views/SelectionView";

const mockedMinifigs: Minifig[] = [
  {
    set_num: "fig-006091",
    name: "Ginny Weasley, Yellow Skin, Gryffindor Sweater with Crest, Cape with Stars",
    num_parts: 5,
    set_img_url: "https://cdn.rebrickable.com/media/sets/fig-006091/60397.jpg",
    set_url: "https://rebrickable.com/minifigs/fig-006091/ginny-…in-gryffindor-sweater-with-crest-cape-with-stars/",
  },
  {
    set_num: "fig-002136",
    name: "Voldemort, Black Robe",
    num_parts: 3,
    set_img_url: "https://cdn.rebrickable.com/media/sets/fig-002136/60332.jpg",
    set_url: "https://rebrickable.com/minifigs/fig-002136/voldemort-black-robe/",
  },
  {
    set_num: "fig-006076",
    name: "Hermione Granger, Gryffindor Sweater with Crest",
    num_parts: 4,
    set_img_url: "https://cdn.rebrickable.com/media/sets/fig-006076/60756.jpg",
    set_url: "https://rebrickable.com/minifigs/fig-006076/hermione-granger-gryffindor-sweater-with-crest/",
  },
];

interface Props<T> extends PropsWithChildren {
  initialValues: [Atom<T>, T][];
}

const HydrateAtoms = ({ initialValues, children }: Props<Minifig[]>) => {
  useHydrateAtoms(initialValues);
  return children;
};

const DrawnMinifigsProvider = ({ initialValues, children }: Props<Minifig[]>) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const SelectionViewWithAtom = () => {
  return (
    <DrawnMinifigsProvider initialValues={[[drawnMinifigsAtom, mockedMinifigs]]}>
      <SelectionView />
    </DrawnMinifigsProvider>
  );
};

describe("Selection view proper rendering", () => {
  beforeEach(() => {
    render(<SelectionViewWithAtom />, { wrapper: BrowserRouter });
  });

  it("the title is visible", () => {
    expect(screen.getByText(TEXTS.selection.title)).toBeInTheDocument();
  });

  it("the button is visible", () => {
    expect(screen.getByText(TEXTS.selection.buttonLabel)).toBeInTheDocument();
  });

  it("the button is initially disabled", () => {
    expect(screen.getByText(TEXTS.selection.buttonLabel)).toBeDisabled();
  });

  it("minifigs titles are displayed", () => {
    expect(screen.getByText(mockedMinifigs[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockedMinifigs[1].name)).toBeInTheDocument();
    expect(screen.getByText(mockedMinifigs[2].name)).toBeInTheDocument();
  });

  it("show details buttons are displayed properly", () => {
    expect(screen.getAllByText(TEXTS.selection.showDetails).length).to.equal(mockedMinifigs.length);
  });

  it("the button is enabled when minifig is selected", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText(mockedMinifigs[0].name));

    expect(screen.getByText(TEXTS.selection.buttonLabel)).not.toBeDisabled();
  });
});
