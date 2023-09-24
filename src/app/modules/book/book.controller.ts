import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import {
  bookFilterableFields,
  bookPriceRangeFilterFields,
} from './book.constant';
import { BookService } from './book.service';

const insertIntoDB = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.insertIntoDB(req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully',
    data: result,
  });
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, paginationFields);
  const priceRange = pick(req.query, bookPriceRangeFilterFields);

  const result = await BookService.getAllFromDB(filters, options, priceRange);

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const options = pick(req.query, paginationFields);

  const result = await BookService.getBooksByCategoryId(
    req.params.categoryId,
    options
  );

  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books  with associated category data fetched successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getBookById(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book fetched successfully',
    data: result,
  });
});

const updateById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.updateById(req.params.id, req.body);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteById = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.deleteById(req.params.id);

  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const BookController = {
  insertIntoDB,
  getAllFromDB,
  getBooksByCategoryId,
  getBookById,
  updateById,
  deleteById,
};
