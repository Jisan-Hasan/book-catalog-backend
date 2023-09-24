"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookPriceRangeFilterFields = exports.bookSearchableFields = exports.bookFilterableFields = void 0;
exports.bookFilterableFields = ['search', 'category'];
exports.bookSearchableFields = ['title', 'author', 'genre'];
exports.bookPriceRangeFilterFields = ['minPrice', 'maxPrice'];
exports.bookRelationalFields = ['category'];
exports.bookRelationalFieldsMapper = {
    category: 'category',
};
