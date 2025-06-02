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
  success(i: IRequestSuccess<T> | string | T = {}) {
    if (!i) {
      return { message: 'Sucesso' };
    }

    if (typeof i === 'string') {
      return { message: i };
    }

    if (Object.prototype.hasOwnProperty.call(i, 'id')) {
      return { message: 'Sucesso', payload: i };
    }

    if (
      typeof i === 'object' &&
      !Object.prototype.hasOwnProperty.call(i, 'data')
    ) {
      return { message: 'Sucesso', payload: i };
    }
    const { data, message } = i as IRequestSuccess<T>;

    return { message: message || 'Sucesso', payload: data };
  }

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
