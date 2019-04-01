import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

router.post('/service', controller.service.create);
router.put('/service/:id', controller.service.changeStatus);

export { router };
