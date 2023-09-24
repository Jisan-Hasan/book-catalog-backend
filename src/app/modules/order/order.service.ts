/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, Role } from '@prisma/client';
import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';

const insertIntoDB = async (userId: string, payload: any): Promise<Order> => {
  const result = await prisma.order.create({
    data: {
      userId: userId,
      orderedBooks: payload.orderedBooks,
    },
  });
  return result;
};

const getAllOrders = async (user: JwtPayload | null): Promise<Order[]> => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  if (user.role === Role.admin) {
    const result = await prisma.order.findMany({});
    return result;
  } else if (user.role === Role.customer) {
    const result = await prisma.order.findMany({
      where: {
        userId: user.userId,
      },
    });

    return result;
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
};

export const OrderService = {
  insertIntoDB,
  getAllOrders,
};
