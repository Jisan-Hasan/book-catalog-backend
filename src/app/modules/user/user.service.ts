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

export const UserService = {
  getAllFromDB,
};
