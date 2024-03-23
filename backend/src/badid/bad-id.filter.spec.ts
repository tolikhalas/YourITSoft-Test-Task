import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { BadIdExceptionFilter } from './bad-id.filter';

describe('BadIdExceptionFilter', () => {
  let filter: BadIdExceptionFilter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BadIdExceptionFilter],
    }).compile();

    filter = module.get<BadIdExceptionFilter>(BadIdExceptionFilter);
  });

  it('should catch BadRequestException and return expected response', () => {
    const mockRequest = {
      url: '/todos/abc', // Invalid ID
    };
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockHost: ArgumentsHost = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
        getResponse: jest.fn().mockReturnValue(mockResponse),
      }),
      getType: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    };

    const badRequestException = new BadRequestException();

    filter.catch(badRequestException, mockHost);

    expect(mockResponse.status).toHaveBeenCalledWith(
      badRequestException.getStatus(),
    );
    expect(mockResponse.json).toHaveBeenCalledWith({
      statusCode: badRequestException.getStatus(),
      timestamp: expect.any(String),
      path: mockRequest.url,
      message: 'Todo ID URL must be a number',
    });
  });
});
