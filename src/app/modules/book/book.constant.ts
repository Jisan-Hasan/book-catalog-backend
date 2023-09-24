export const bookFilterableFields: string[] = ['search', 'category'];

export const bookSearchableFields: string[] = ['title', 'author', 'genre'];

export const bookPriceRangeFilterFields: string[] = ['minPrice', 'maxPrice'];

export const bookRelationalFields: string[] = ['category'];
export const bookRelationalFieldsMapper: {
  [key: string]: string;
} = {
  category: 'category',
};
