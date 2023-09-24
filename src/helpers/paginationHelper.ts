type IOptions = {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: string;
};

type IOptionsResult = {
  page: number;
  size: number;
  skip: number;
  sortBy: string | null;
  sortOrder: string | null;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = Number(options.page || 1);
  const size = Number(options.size || 10);
  const skip = (page - 1) * size;

  const sortBy = options.sortBy || null;
  const sortOrder = options.sortOrder || null;

  return {
    page,
    size,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  calculatePagination,
};
