import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Atom, Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { TEXTS } from "../../constants";
import { selectedMinifigAtom } from "../../store";
import { Minifig } from "../../types";
import ShippingView from "../../views/ShippingView";

const mockedMinifig: Minifig = {
  set_num: "fig-006091",
  name: "Ginny Weasley, Yellow Skin, Gryffindor Sweater with Crest, Cape with Stars",
  num_parts: 5,
  set_img_url: "https://cdn.rebrickable.com/media/sets/fig-006091/60397.jpg",
  set_url: "https://rebrickable.com/minifigs/fig-006091/ginny-…in-gryffindor-sweater-with-crest-cape-with-stars/",
};

interface Props<T> extends PropsWithChildren {
  initialValues: [Atom<T>, T][];
}

const HydrateAtoms = ({ initialValues, children }: Props<Minifig | null>) => {
  useHydrateAtoms(initialValues);
  return children;
};

const SelectedMinifigProvider = ({ initialValues, children }: Props<Minifig | null>) => (
  <Provider>
    <HydrateAtoms initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

const ShippingViewWithAtom = () => {
  return (
    <SelectedMinifigProvider initialValues={[[selectedMinifigAtom, mockedMinifig]]}>
      <ShippingView />
    </SelectedMinifigProvider>
  );
};

describe("Shipping view", () => {
  describe("renders properly", () => {
    beforeEach(() => {
      render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });
    });

    it("the title is visible", () => {
      expect(screen.getByText(TEXTS.shipping.title)).toBeInTheDocument();
    });

    it("the button is visible", () => {
      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeInTheDocument();
    });

    it("the button is initially disabled", () => {
      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeDisabled();
    });
  });

  describe("Summary renders properly", () => {
    beforeEach(() => {
      render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });
    });

    it("the title is visible", () => {
      expect(screen.getByText(TEXTS.shipping.summary)).toBeInTheDocument();
    });

    it("the selected minifig name is visible", () => {
      expect(screen.getByText(mockedMinifig.name)).toBeInTheDocument();
    });

    it("the number of selected minifig's parts is correct", async () => {
      const partsWrapper = await screen.findByTestId("parts-wrapper");

      expect(partsWrapper.children.length).to.equal(mockedMinifig.num_parts);
    });
  });

  describe("Form renders properly", () => {
    it("Inputs", () => {
      render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });

      it("name input", () => {
        render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });

        expect(screen.getByText(TEXTS.shipping.labels.name)).toBeInTheDocument();

        // validation error case

        // proper value case
      });

      expect(screen.getByText(TEXTS.shipping.labels.name)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.surname)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.phoneNumber)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.email)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.dateOfBirth)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.address)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.city)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.state)).toBeInTheDocument();
      expect(screen.getByText(TEXTS.shipping.labels.zipCode)).toBeInTheDocument();
    });

    it("the title is visible", () => {
      render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });

      expect(screen.getByText(TEXTS.shipping.summary)).toBeInTheDocument();
    });
  });
});
