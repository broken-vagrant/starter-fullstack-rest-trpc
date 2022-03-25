import { TRPCClientErrorLike } from '@trpc/client';
import { AppRouter } from './trpc';

export type FormattedError = {
  message?: string;
  formErrors?: string[];
  fieldErrors?: {
    [k: string]: string[];
  };
};
export function formatError(
  error: TRPCClientErrorLike<AppRouter> | Error
): FormattedError {
  if ('shape' in error && error.shape && 'data' in error.shape) {
    const { data } = error.shape;
    if (data.code === 'INTERNAL_SERVER_ERROR') {
      return {
        message: 'Something went wrong!',
      };
    }
    if (data.code === 'BAD_REQUEST') {
      if (data.zodError) {
        return {
          ...data.zodError,
        };
      }
      return {
        message: error.message,
      };
    }
  }
  return {
    message: 'Something went wrong!',
  };
}
