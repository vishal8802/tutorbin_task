const router = require('express').Router();
const {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTaskSoft,
  deleteTaskHard,
  restoreTask,
} = require('./tasks.controller');
const { validate } = require('../../utils/validate');
const { authenticate } = require('../../utils/jwt');
const {
  getTasksRequestSchema,
  getTaskByIdRequestSchema,
  addTaskRequestSchema,
  updateTaskRequestSchema,
  deleteTaskRequestSchema,
  deleteTaskHardRequestSchema,
  restoreTaskRequestSchema,
} = require('./tasks.requestSchema');

router.get(
  '/',
  authenticate,
  validate({ schema: getTasksRequestSchema, dataIn: 'query' }),
  getTasks,
);
router.get(
  '/:taskId',
  authenticate,
  validate({ schema: getTaskByIdRequestSchema, dataIn: 'params' }),
  getTaskById,
);
router.post(
  '/',
  authenticate,
  validate({ schema: addTaskRequestSchema, dataIn: 'body' }),
  addTask,
);
router.put(
  '/',
  authenticate,
  validate({ schema: updateTaskRequestSchema, dataIn: 'body' }),
  updateTask,
);
router.patch(
  '/soft-delete',
  authenticate,
  validate({ schema: deleteTaskRequestSchema, dataIn: 'query' }),
  deleteTaskSoft,
);

router.patch(
  '/restore',
  authenticate,
  validate({ schema: restoreTaskRequestSchema, dataIn: 'query' }),
  restoreTask,
);

router.delete(
  '/hard-delete',
  authenticate,
  validate({ schema: deleteTaskHardRequestSchema, dataIn: 'query' }),
  deleteTaskHard,
);

module.exports = router;
