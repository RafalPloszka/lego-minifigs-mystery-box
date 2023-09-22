import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { TEXTS } from "../../constants";
import { selectedMinifigAtom } from "../../store";
import { Minifig } from "../../types";
import ShippingView from "../../views/ShippingView";
import { SelectedMinifigProvider } from "../utils";

const mockedMinifig: Minifig = {
  set_num: "fig-006091",
  name: "Ginny Weasley, Yellow Skin, Gryffindor Sweater with Crest, Cape with Stars",
  num_parts: 5,
  set_img_url: "https://cdn.rebrickable.com/media/sets/fig-006091/60397.jpg",
  set_url: "https://rebrickable.com/minifigs/fig-006091/ginny-…in-gryffindor-sweater-with-crest-cape-with-stars/",
};

const ShippingViewWithAtom = () => {
  return (
    <SelectedMinifigProvider initialValues={[[selectedMinifigAtom, mockedMinifig]]}>
      <ShippingView />
    </SelectedMinifigProvider>
  );
};

describe("Shipping view", () => {
  describe("renders properly:", () => {
    beforeEach(() => {
      render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });
    });

    it("the title is visible", () => {
      expect(screen.getByText(TEXTS.shipping.title)).toBeInTheDocument();
    });

    it("the button is visible", () => {
      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeInTheDocument();
    });

    it("submit button is initially disabled", () => {
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

  describe("When form is filled", () => {
    beforeEach(async () => {
      render(<ShippingViewWithAtom />, { wrapper: BrowserRouter });
      const user = userEvent.setup();

      // Fill form with valid values (omit Name input only):

      const surnameInput = screen.getByLabelText(TEXTS.shipping.labels.surname) as HTMLInputElement;
      await user.type(surnameInput, "Doe");

      const phoneNumberInput = screen.getByLabelText(TEXTS.shipping.labels.phoneNumber) as HTMLInputElement;
      await user.type(phoneNumberInput, "123123123");

      const emailInput = screen.getByLabelText(TEXTS.shipping.labels.email) as HTMLInputElement;
      await user.type(emailInput, "john.doe@example.com");

      const dateInput = screen.getByLabelText(TEXTS.shipping.labels.dateOfBirth) as HTMLInputElement;
      await user.type(dateInput, "2023-09-07");

      const addressInput = screen.getByLabelText(TEXTS.shipping.labels.address) as HTMLInputElement;
      await user.type(addressInput, "10 Unknown Street");

      const cityInput = screen.getByLabelText(TEXTS.shipping.labels.city) as HTMLInputElement;
      await user.type(cityInput, "Los Angeles");

      const stateInput = screen.getByLabelText(TEXTS.shipping.labels.state) as HTMLInputElement;
      await user.selectOptions(stateInput, "California");

      const zipCodeInput = screen.getByLabelText(TEXTS.shipping.labels.zipCode) as HTMLInputElement;
      await user.type(zipCodeInput, "12345");
    });

    it("submit button is disabled when any (for example Name) input is empty", async () => {
      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeDisabled();
    });

    it("submit button is enabled when all inputs are valid", async () => {
      const user = userEvent.setup();
      const nameInput = screen.getByLabelText(TEXTS.shipping.labels.name) as HTMLInputElement;
      // Fill input name so the whole form is filled
      await user.type(nameInput, "John");

      expect(screen.getByText(TEXTS.shipping.buttonLabel)).not.toBeDisabled();
    });

    it("submit button is disabled when phone number is invalid (letters)", async () => {
      const user = userEvent.setup();
      const phoneNumberInput = screen.getByLabelText(TEXTS.shipping.labels.phoneNumber) as HTMLInputElement;
      await user.type(phoneNumberInput, "1q31q31q3");

      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeDisabled();
    });

    it("submit button is disabled when email is in wrong format (no @)", async () => {
      const user = userEvent.setup();
      const emailInput = screen.getByLabelText(TEXTS.shipping.labels.email) as HTMLInputElement;
      await user.type(emailInput, "john.doe#example.com");

      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeDisabled();
    });

    it("submit button is disabled when zip code has wrong format (6 digits)", async () => {
      const user = userEvent.setup();
      const zipCodeInput = screen.getByLabelText(TEXTS.shipping.labels.zipCode) as HTMLInputElement;
      await user.type(zipCodeInput, "123456");

      expect(screen.getByText(TEXTS.shipping.buttonLabel)).toBeDisabled();
    });
  });
});
