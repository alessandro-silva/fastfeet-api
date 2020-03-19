import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import CourierController from './app/controllers/CourierController';
import OrderController from './app/controllers/OrderController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import NotificationController from './app/controllers/NotificationController';

import authMiddeware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddeware);

routes.post('/recipients', RecipientController.store);

routes.get('/couriers', CourierController.index);
routes.post('/couriers', CourierController.store);
routes.put('/couriers', CourierController.update);
routes.delete('/couriers', CourierController.delete);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders', OrderController.update);
routes.delete('/orders', OrderController.delete);

routes.get('/deliverymans', DeliverymanController.index);
routes.post('/deliverymans/:id', DeliverymanController.store);
routes.put('/deliverymans/:id', DeliverymanController.update);
routes.delete('/deliverymans/:id', DeliverymanController.delete);

routes.get('/deliveries', DeliveryController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
