import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();

router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.insertIntoDB
);

router.get('/', BookController.getAllFromDB);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);

export const BookRoutes = router;
