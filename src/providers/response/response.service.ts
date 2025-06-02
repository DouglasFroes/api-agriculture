import { Global, Injectable, NotFoundException } from '@nestjs/common';

export interface IRequestSuccess<T> {
  data?: T;
  message?: string;
}

export interface IRequestPagination<T> {
  data: T[];
  total: number;
  limit: number;
  currentPage: number;
  message?: string;
}

@Injectable()
@Global()
export class ResponseService<T> {
  pagination({
    currentPage,
    data,
    limit,
    total,
    message,
  }: IRequestPagination<T>) {
    const perPage = Math.ceil(total / limit);

    if ((currentPage > perPage || currentPage < 1) && currentPage !== 1) {
      throw new NotFoundException();
    }

    return {
      message: message || 'Sucesso',
      payload: {
        data,
        total,
        currentPage,
        perPage,
        limit,
      },
    };
  }
}
