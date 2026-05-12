const { path } = require("../app");
const Product = require("../models/products.model");

exports.create = async (req, res, next) => {
  try {
    const doc = await Product.create(req.body);
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

    //filtering
    const excludeFields = ["page", "sort", "limit", "search"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    queryObj = JSON.parse(queryStr);

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

    //combination
    let query = { ...searchQuery, ...queryObj };

    const docs = await Product.find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate({
        path: "category",
        select: "_id name",
      });
    //count page
    const totalItem = await Product.countDocuments(query);
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
    const doc = await Product.findById(id).populate({
      path: "category",
      select: "_id name",
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
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
    const doc = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
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
    const doc = await Product.findByIdAndDelete(id);

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
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
