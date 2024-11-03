import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingService } from './booking.service';
import { Request, Response } from 'express';

const CreateBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.createBookingIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully ',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.getAllBookingIntoDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const TotalSale = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingService.TotalSaleIntoDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Total Sale retrieved successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await BookingService.deleteBookingIntoDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings cancel successfully',
    data: result,
  });
});
const getBookingByUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await BookingService.getBookingByUserIntoDb(user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const getmyBooking = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  const result = await BookingService.getMyBookingIntoDb(user.userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

const createPaymentIntent = catchAsync(async (req: Request, res: Response) => {
  const { amount, order } = req.body;

  console.log(
    'Creating payment intent with amount:',
    amount,
    'and order data:',
    order,
  );

  // Call the service to create PaymentIntent and save booking
  const paymentIntentResponse = await BookingService.createPaymentIntent(
    amount,
    order,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment Intent and Booking created successfully',
    data: paymentIntentResponse,
  });
});

export const bookingController = {
  CreateBooking,
  getAllBooking,
  getmyBooking,
  deleteBooking,
  TotalSale,
  getBookingByUser,
  createPaymentIntent,
};
