export type IBookFilterRequest = {
  search?: string | undefined;
  category?: string | undefined;
};

export type IBookPriceRangeFilterRequest = {
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
};
