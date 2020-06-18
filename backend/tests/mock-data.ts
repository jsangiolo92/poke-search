const mockRes = {} as any;
mockRes.status = jest.fn().mockReturnValue(mockRes);
mockRes.send = jest.fn().mockReturnValue(mockRes);

export const expressMocks = {
  mockReq: jest.fn() as any,
  mockRes,
  mockNext: jest.fn(),
};
