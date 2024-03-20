"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Department = require("../models/department.model");

module.exports = {
  list: async (req, res) => {
    // const data = await Department.find(search).sort(sort).skip(skip).limit(limit);
    const data = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Department),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Department.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await Department.findOne({ _id: req.params.body });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Department.update({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    const newData = await Department.findOne({ _id: req.params.id });
    res.status(202).send({
      error: false,
      body: req.body,
      data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await Department.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
