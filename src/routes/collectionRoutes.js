import express from "express";
import {
  createCollection,
  deleteCollection,
  getAllCollecton,
  getSingleCollection,
  updateCollection,
} from "../controllers/collectionControllers.js";
import { isLoggedIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//createCollection || method:post || /api/v1/collection/create-collection
router.post("/create-collection", isLoggedIn, isAdmin, createCollection);

//updateCollection || method:put || /api/v1/collection/update-collection
router.put("/update-collection/:id", isLoggedIn, isAdmin, updateCollection);

//deleteCollection || method:delete || /api/v1/collection/delete-collection
router.delete("/delete-collection/:id", isLoggedIn, isAdmin, deleteCollection);

//getAllCollection || method:get || /api/v1/collection/get-allcollection
router.get("/get-allcollection", getAllCollecton);

//getSingleCollection || method:get || /api/v1/collection/get-singleCollection
router.get("/single-collection/:id", getSingleCollection);

export default router;
