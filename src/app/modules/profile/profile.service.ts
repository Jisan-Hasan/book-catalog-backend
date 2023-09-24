import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const getProfile = async (user: JwtPayload | null): Promise<User | null> => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const result = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  return result;
};

export const ProfileService = {
  getProfile,
};
