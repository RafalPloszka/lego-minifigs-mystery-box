import { Atom, Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { PropsWithChildren } from "react";

import { Minifig } from "../types";

interface HydrateAtomProps<T> extends PropsWithChildren {
  initialValues: [Atom<T>, T][];
}

const HydrateAtoms = <T,>({ initialValues, children }: HydrateAtomProps<T>) => {
  // TODO: resolve type error
  useHydrateAtoms(initialValues);
  return children;
};

export const DrawnMinifigsProvider = ({ initialValues, children }: HydrateAtomProps<Minifig[]>) => (
  <Provider>
    <HydrateAtoms<Minifig[]> initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);

export const SelectedMinifigProvider = ({ initialValues, children }: HydrateAtomProps<Minifig | null>) => (
  <Provider>
    <HydrateAtoms<Minifig | null> initialValues={initialValues}>{children}</HydrateAtoms>
  </Provider>
);
