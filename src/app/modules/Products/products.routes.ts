import express from 'express';
import validateRequest from '../../middleware/validateRequest';

import { ProductController } from './products.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.canstance';
import { productValidations } from './products.validation';

const router = express.Router();

router.get('/:id', ProductController.getSingle);
router.post(
  '/',
  validateRequest(productValidations.productValidationSchema),
  ProductController.creatProduct,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(productValidations.UpdateproductValidationSchema),
  ProductController.updateProduct,
);

router.delete(
  '/:id',
  auth(USER_ROLE.admin),

  ProductController.deleteProduct,
);

// router.delete('/:id', ProductController.deleteProduct);
router.get('/category', ProductController.getAllProduct);

router.get('/', ProductController.getAllProduct);
router.get('/revenue', ProductController.SelRevenu);
export const productRouter = router;
