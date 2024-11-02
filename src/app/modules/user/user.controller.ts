import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { userService } from './user.service';

const Createsignup = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createSingupIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: result,
  });
});

const googleUser = catchAsync(async (req, res) => {
  const result = await userService.googleUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: result,
  });
});

const addImage = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const result = await userService.PostImageIntoDb(req.body, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Image add  succesfully!',
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const result = await userService.getProfileFromDB(userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const allUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.allUserFromDb();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;

  // Validate role if necessary
  if (!role || !['admin', 'user'].includes(role)) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'Invalid role',
      data: null,
    });
  }

  // Call the service function to update the user role
  const updatedUser = await userService.updateUserRoleIntoDB(id, role);

  // If no user was found, send a NOT_FOUND response
  if (!updatedUser) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'User not found',
      data: null,
    });
  }

  // Respond with the updated user data
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Role updated successfully',
    data: updatedUser,
  });
});

export const userController = {
  Createsignup,
  loginUser,
  getProfile,
  allUser,
  googleUser,
  addImage,
  updateUserRole,
};
