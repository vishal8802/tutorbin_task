const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

const TasksSchema = new Schema(
  {
    userId: { type: ObjectId, required: true },
    title: { type: String },
    description: { type: String },
    isDeleted: { type: Boolean },
  },
  { timestamps: true },
);

module.exports = model('tasks', TasksSchema);
