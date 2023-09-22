import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";

import { TEXTS } from "../../constants";
import HomeView from "../../views/HomeView";

describe("Home view proper rendering", () => {
  beforeEach(() => {
    render(<HomeView />, { wrapper: BrowserRouter });
  });

  it("the title is visible", () => {
    expect(screen.getByText(TEXTS.home.title)).toBeInTheDocument();
  });

  it("the button is visible", () => {
    expect(screen.getByText(TEXTS.home.buttonLabel)).toBeInTheDocument();
  });

  it("button converts to loading state when clicked", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByText(TEXTS.home.buttonLabel));

    expect(screen.getByText(TEXTS.home.buttonLabelLoading)).toBeInTheDocument();
  });
});
