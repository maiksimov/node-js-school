import * as Router from 'koa-router';
import controller = require('./controller');

const router = new Router();

// GENERAL ROUTES
router.get('/', controller.general.helloWorld);
router.get('/jwt', controller.general.getJwtPayload);

// USER ROUTES
router.get('/users', controller.user.getUsers);
router.get('/users/:id', controller.user.getUser);
router.post('/users', controller.user.createUser);
router.put('/users/:id', controller.user.updateUser);
router.delete('/users/:id', controller.user.deleteUser);


router.get('/users/:id/books', controller.book.getUserBooks);
router.get('/books', controller.book.getAllBooks);
router.get('/books/:id', controller.book.getBook);
router.put('/books/:id', controller.book.updateBook);
router.delete('/books/:id', controller.book.deleteBook);

router.post('/service', controller.service.create);
router.put('/service/:id', controller.service.status);

export { router };
