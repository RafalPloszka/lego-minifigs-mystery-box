// These types should be generated (for example with with swagger-typescript-api)

export type Minifig = {
  set_num: string;
  name: string;
  num_parts: number;
  set_img_url: string | null;
  set_url: string;
};

export type MinifigsResponse = {
  count: number;
  results: Minifig[];
};

export type Part = {
  part_num: string;
  name: string;
  part_img_url: string;
};

export type MinifigPartsResponse = {
  count: number;
  results: {
    id: number;
    part: Part;
  }[];
};
