import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsControler from './controllers/ConnectionsController';


const routes = express.Router();
const classesControllers = new ClassesController();
const connectionsController = new ConnectionsControler();

routes.post('/classes', classesControllers.create);
routes.get('/classes', classesControllers.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);


export default routes;
 