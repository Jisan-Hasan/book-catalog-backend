import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (payload: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data: payload,
  });

  return result;
};

const getAllFromDB = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

const getByIdFromDB = async (id: string): Promise<Category | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id: id,
    },
    include: {
      books: true,
    },
  });

  return result;
};

export const CategoryService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
};
