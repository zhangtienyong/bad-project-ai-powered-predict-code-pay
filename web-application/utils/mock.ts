import type { Request, Response } from "express";

export const getRequest = () =>
  ({
    params: {},
    query: {},
    body: {},
    session: {},
  }) as Request;

export const getResponse = () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as any as Response;
  return res;
};
