import { NextResponse } from 'next/server';

type ResponsePayload = {
  status: number;
  error: string;
  message?: string;
};

type ErrorOptions = {
  message?: string;
  error?: string;
};

const sendResponse = (status: number, error: string, message?: string): NextResponse => {
  const responsePayload: ResponsePayload = { error, status };

  if (message) {
    responsePayload.message = message;
  }

  return NextResponse.json(responsePayload, { status });
};

export const badRequest = ({ message = '', error = '' }: ErrorOptions = {}) => {
  return sendResponse(400, error || 'bad request', message);
};

export const forbidden = ({ message = '', error = '' }: ErrorOptions = {}) => {
  return sendResponse(403, error || 'forbidden', message);
};

export const notFound = ({ message = '', error = '' }: ErrorOptions = {}) => {
  return sendResponse(404, error || 'not found', message);
};

export const internalServerError = ({ message = '', error = '' }: ErrorOptions = {}) => {
  return sendResponse(500, error || 'internal server error', message);
};
