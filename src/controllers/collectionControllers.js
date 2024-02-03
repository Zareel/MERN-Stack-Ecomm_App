import Collection from "../models/collectionSchema.js";

//createCollection || method:post || /api/v1/collection/createCollection
export const createCollection = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).json({
        success: false,
        message: "Please provide collection name",
      });
    }
    const existingCollection = await Collection.findOne({ name });
    if (existingCollection) {
      return res.status(200).json({
        success: true,
        message: "Collecion already exists",
      });
    }
    const collection = await Collection.create({ name });
    res.status(200).json({
      success: true,
      message: "New collection has been created successfully",
      collection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in creating collection",
      error,
    });
  }
};

//updateCollection || method:put || /api/v1/collection/update-collection
export const updateCollection = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }
    const updatedCollection = await Collection.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updateCollection) {
      return res.status(400).json({
        success: false,
        message: "Collection not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Collection has been updated successfully",
      updatedCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in updating collection name",
      error,
    });
  }
};

//deleteCollection || method:delete || /api/v1/collection/delete-collection
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const collectionToDelete = await Collection.findByIdAndDelete(id);

    if (!collectionToDelete) {
      return res.status(400).json({
        success: false,
        message: "Collection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Collection has been deleted successfully",
      collectionToDelete,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in deleting collection",
      error,
    });
  }
};

//getAllCollection || method:get || /api/v1/collections/get-allcollection
export const getAllCollecton = async (req, res) => {
  try {
    const collections = await Collection.find();
    if (!collections) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "All Collections",
      collections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting all Collection",
      error,
    });
  }
};

//singleCollection || method:get || /api/v1/collection/get-singleCollection
export const getSingleCollection = async (req, res) => {
  try {
    const singleCollection = await Collection.findOne({ id: req.params._id });
    res.status(200).json({
      success: true,
      message: "Single Collection",
      singleCollection,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in getting single collection",
      error,
    });
  }
};
