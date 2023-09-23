import { User } from '@prisma/client';
import prisma from '../../../shared/prisma';

const getAllFromDB = async (): Promise<Partial<User>[]> => {
  const result = await prisma.user.findMany({
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const getByIdFromDB = async (id: string): Promise<Partial<User> | null> => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

const updateByIdFromDB = async (
  id: string,
  payload: Partial<User>
): Promise<Partial<User> | null> => {
  //   update user data
  const result = await prisma.user.update({
    where: { id },
    data: payload,
    select: {
      password: false,
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

export const UserService = {
  getAllFromDB,
  getByIdFromDB,
  updateByIdFromDB,
};
