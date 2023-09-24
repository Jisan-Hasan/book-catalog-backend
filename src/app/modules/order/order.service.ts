/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order } from '@prisma/client';
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

export const OrderService = {
  insertIntoDB,
};
