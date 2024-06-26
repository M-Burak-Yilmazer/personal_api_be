"use strict";

/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

const Personnel = require("../models/personnel.model");

module.exports = {
  list: async (req, res) => {
    // const data = await Personnel.find(search).sort(sort).skip(skip).limit(limit);
    const data = await res.getModelList(Personnel);
    res.status(200).send({
      error: false,
      detail: await res.getModelListDetails(Personnel),
      data,
    });
  },
  create: async (req, res) => {
    const data = await Personnel.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  read: async (req, res) => {
    const data = await Personnel.findOne({ _id: req.params.body });
    res.status(200).send({
      error: false,
      data,
    });
  },
  update: async (req, res) => {
    const data = await Personnel.update({ _id: req.params.id }, req.body, {
      runValidators: true,
    });
    const newData = await Personnel.findOne({ _id: req.params.id });
    res.status(202).send({
      error: false,
      body: req.body,
      data,
      newData,
    });
  },
  delete: async (req, res) => {
    const data = await Personnel.deleteOne({ _id: req.params.id });
    res.status(data.deletedCount >= 1 ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
