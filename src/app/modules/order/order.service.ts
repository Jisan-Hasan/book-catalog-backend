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

const getOrderById = async (
  orderId: string,
  user: JwtPayload | null
): Promise<Order | null> => {
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  //   check if user is admin
  if (user.role === Role.admin) {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    return result;
  }

  //   check if user is customer
  if (user.role === Role.customer) {
    const result = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (result?.userId !== user.userId) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are forbidden for this order'
      );
    }

    return result;
  }

  throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
};

export const OrderService = {
  insertIntoDB,
  getAllOrders,
  getOrderById,
};
