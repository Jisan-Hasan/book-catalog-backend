/* eslint-disable @typescript-eslint/no-explicit-any */
import { Book, Prisma } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  bookRelationalFields,
  bookRelationalFieldsMapper,
  bookSearchableFields,
} from './book.constant';
import {
  IBookFilterRequest,
  IBookPriceRangeFilterRequest,
} from './book.interface';

const insertIntoDB = async (payload: Book): Promise<Book> => {
  const result = await prisma.book.create({
    data: payload,
    include: {
      category: true,
    },
  });
  return result;
};

const getAllFromDB = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions,
  priceRange: IBookPriceRangeFilterRequest
): Promise<IGenericResponse<Book[]>> => {
  const { search, ...filterData } = filters;
  const { page, size, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { minPrice, maxPrice } = priceRange;

  const andConditions = [];

  if (search) {
    andConditions.push({
      OR: bookSearchableFields.map(field => ({
        [field]: {
          contains: search,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (bookRelationalFields.includes(key)) {
          return {
            [bookRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  // filter with min max price
  if (minPrice && maxPrice) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
        lte: Number(maxPrice),
      },
    });
  } else if (minPrice) {
    andConditions.push({
      price: {
        gte: Number(minPrice),
      },
    });
  } else if (maxPrice) {
    andConditions.push({
      price: {
        lte: Number(maxPrice),
      },
    });
  }

  const whereConditions: Prisma.BookWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.book.findMany({
    include: {
      category: true,
    },
    where: whereConditions,
    skip,
    take: size,
    orderBy: sortBy && sortOrder ? { [sortBy]: sortOrder } : { title: 'desc' },
  });

  const total = await prisma.book.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      size,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const getBooksByCategoryId = async (
  categoryId: string,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { page, size, skip } = paginationHelpers.calculatePagination(options);
  const result = await prisma.book.findMany({
    where: {
      categoryId: categoryId,
    },
    include: {
      category: true,
    },
    skip,
    take: size,
  });

  const total = await prisma.book.count({
    where: {
      categoryId: categoryId,
    },
  });
  return {
    meta: {
      total,
      page,
      size,
      totalPage: Math.ceil(total / size),
    },
    data: result,
  };
};

const getBookById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

const updateById = async (id: string, payload: Book): Promise<Book | null> => {
  const result = await prisma.book.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

const deleteById = async (id: string): Promise<Book | null> => {
  const result = await prisma.book.delete({
    where: {
      id: id,
    },
  });

  return result;
};

export const BookService = {
  insertIntoDB,
  getAllFromDB,
  getBooksByCategoryId,
  getBookById,
  updateById,
  deleteById,
};
