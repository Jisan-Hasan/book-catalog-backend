import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';

const createUser = async (payload: User): Promise<User> => {
  const result = await prisma.user.create({
    data: payload,
  });

  return result;
};

const signin = async (payload: {
  email: string;
  password: string;
}): Promise<string> => {
  // check if user exists
  const isUserExists = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  //   throw error if user does not exist
  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // check if password is correct
  const isPasswordCorrect = isUserExists.password === payload.password;

  //   throw error if password is incorrect
  if (!isPasswordCorrect) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }

  // generate token
  const token = jwtHelpers.createToken(
    { userId: isUserExists.id, role: isUserExists.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  // return token
  return token;
};

export const AuthService = {
  createUser,
  signin,
};
