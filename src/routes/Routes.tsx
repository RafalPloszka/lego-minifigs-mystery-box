import { createBrowserRouter } from "react-router-dom";

import HomeView from "../views/HomeView";
import SelectionView from "../views/SelectionView";
import ShippingView from "../views/ShippingView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: "select",
    element: <SelectionView />,
  },
  {
    path: "shipping",
    element: <ShippingView />,
  },
]);
