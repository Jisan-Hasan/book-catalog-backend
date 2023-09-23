import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.insertIntoDB(req.body);

  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

export const CategoryController = {
  insertIntoDB,
};