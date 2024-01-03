import { HttpStatus } from '@nestjs/common';

export function CustomDataResponse(
  status: HttpStatus,
  message: string,
  data: unknown,
) {
  return {
    statusCode: status,
    message: message,
    data: data,
  };
}
