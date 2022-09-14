const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { ObjectId } = mongoose.Types;

const TasksSchema = new Schema(
  {
    userId: { type: ObjectId, required: true },
    title: { type: String },
    isDeleted: { type: Boolean },
  },
  { timestamps: true },
);
TasksSchema.index({ userId: 1 });
TasksSchema.index({ _id: 1, userId: 1 });

module.exports = model('tasks', TasksSchema);
