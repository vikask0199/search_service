import express from "express";
import { createStore, deleteStoreByEmailId, getAllStores, getStoreByEmailId, getStoresByCategoryAndLocation, updateStoreByEmailId } from "../controllers/storeController";


const router = express.Router()

router.post('/createstores', createStore);
router.get('/stores', getStoresByCategoryAndLocation);
router.get('/stores/all', getAllStores);
router.get('/stores/:email', getStoreByEmailId);
router.patch('/stores/:email', updateStoreByEmailId);
router.delete('/stores/:email', deleteStoreByEmailId);


export default router;