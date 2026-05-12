const category = require("../models/categories.model");

exports.create = async (req, res, next) => {
  try {
    const doc = await category.create(req.body);
    res.status(201).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};
exports.findAll = async (req, res, next) => {
  try {
    const searchQuery = {};
    let sortBy = "";
    let queryObj = { ...req.query };

    //search query
    if (req.query.search) {
      searchQuery["$text"] = { $search: req.query.search };
    }

    //sort
    if (req.query.sort) {
      sortBy = req.query.sort;
    } else {
      sortBy = "_id";
    }

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    const docs = await category
      .find(searchQuery)
      .sort(sortBy)
      .skip(skip)
      .limit(limit);
    //count page
    const totalItem = await category.find(searchQuery).countDocuments();
    const totalPage = Math.ceil(totalItem / limit);

    res.status(200).json({
      success: true,
      result: {
        totalPage,
        data: docs,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await category.findById(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await category.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    res.status(201).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    const doc = await category.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      result: doc,
    });
  } catch (error) {
    next(error);
  }
};
