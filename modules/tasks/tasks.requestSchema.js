const getTasksRequestSchema = {
  type: 'object',
  properties: { searchKey: { type: 'string' } },
  additionalProperties: false,
};

const getTaskByIdRequestSchema = {
  type: 'object',
  properties: { taskId: { type: 'string' } },
  required: ['taskId'],
  additionalProperties: false,
};

const addTaskRequestSchema = {
  type: 'object',
  properties: { title: { type: 'string' } },
  required: ['title'],
  additionalProperties: false,
};

const updateTaskRequestSchema = {
  type: 'object',
  properties: { title: { type: 'string' }, taskId: { type: 'string' } },
  required: ['title', 'taskId'],
  additionalProperties: false,
};

const deleteTaskRequestSchema = {
  type: 'object',
  properties: { taskId: { type: 'string' } },
  required: ['taskId'],
  additionalProperties: false,
};

const restoreTaskRequestSchema = { ...deleteTaskRequestSchema };
const deleteTaskHardRequestSchema = { ...deleteTaskRequestSchema };

module.exports = {
  getTasksRequestSchema,
  getTaskByIdRequestSchema,
  addTaskRequestSchema,
  updateTaskRequestSchema,
  deleteTaskRequestSchema,
  deleteTaskHardRequestSchema,
  restoreTaskRequestSchema,
};
