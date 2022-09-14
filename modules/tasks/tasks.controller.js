const { taskModel } = require('../../db/models');

const getTasks = async (req, res) => {
  try {
    const { searchKey } = req.query;
    const { _id: userId } = req.user;
    const matchObj = { userId, isDeleted: { $ne: true } };
    if (searchKey) matchObj.title = { $regex: searchKey, $options: 'i' };
    const selectedFields = { title: 1, createdAt: 1 };
    const data = await taskModel.find(matchObj, selectedFields).lean();
    res.status(200).send({ data });
  } catch (err) {
    res.status(500).send({ message: 'Internal Error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { _id: userId } = req.user;
    const matchObj = { userId, _id: taskId };

    const selectedFields = { title: 1, createdAt: 1, isDeleted: 1 };
    const data = await taskModel.findOne(matchObj, selectedFields).lean();
    if (!data) return res.status(404).send({ message: 'Not found' });
    return res.status(200).send({ data });
  } catch (err) {
    return res.status(500).send({ message: 'Internal Error' });
  }
};

const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    const { _id: userId } = req.user;
    const taskObj = new taskModel({ userId, title });
    await taskObj.save();
    res.status(201).send({ message: 'Task added' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, taskId } = req.body;
    const { _id: userId } = req.user;

    const matchObj = { userId, _id: taskId };
    const updateObj = { title };
    await taskModel.updateOne(matchObj, updateObj);
    res.status(201).send({ message: 'Task updated' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Error' });
  }
};

const deleteTaskSoft = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { _id: userId } = req.user;

    const matchObj = { userId, _id: taskId };
    const updateObj = { isDeleted: true };
    await taskModel.updateOne(matchObj, { $set: updateObj });
    res.status(201).send({ message: 'Task moved to bin' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Error' });
  }
};

const restoreTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { _id: userId } = req.user;
    const matchObj = { userId, _id: taskId };
    const updateObj = { isDeleted: false };
    await taskModel.updateOne(matchObj, updateObj);
    res.status(201).send({ message: 'Task restored' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Error' });
  }
};

const deleteTaskHard = async (req, res) => {
  try {
    const { taskId } = req.query;
    const { _id: userId } = req.user;

    const matchObj = { userId, _id: taskId };
    await taskModel.deleteOne(matchObj);
    res.status(201).send({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Error' });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  addTask,
  updateTask,
  deleteTaskSoft,
  deleteTaskHard,
  restoreTask,
};
