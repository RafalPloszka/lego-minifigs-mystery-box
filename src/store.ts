import { atomWithStorage } from "jotai/utils";

import { Minifig } from "./types";

export const drawnMinifigsAtom = atomWithStorage<Minifig[]>("drawn", []);

export const selectedMinifigAtom = atomWithStorage<Minifig | null>("selected", null);
