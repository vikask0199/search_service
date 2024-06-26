import express from "express";
import { createStore, deleteStoreByEmailId, getAllStores, getStoreByEmailId, getStoresByCategoryAndLocation, getStreamData, totalStoreCount, updateStoreByEmailId } from "../controllers/storeController";
import { checkAuthorizeOrNot } from "../middlewares/checkAuthorizeOrNot";


const router = express.Router()

router.post('/createstores', checkAuthorizeOrNot, createStore);
router.get('/stores', getStoresByCategoryAndLocation);
router.get('/getAllStoreCount', checkAuthorizeOrNot,totalStoreCount);
router.get('/stores/all', checkAuthorizeOrNot, getAllStores);
router.get('/stores/:email', checkAuthorizeOrNot, getStoreByEmailId);
router.patch('/stores/:email', checkAuthorizeOrNot, updateStoreByEmailId);
router.delete('/stores/:email', checkAuthorizeOrNot, deleteStoreByEmailId);
router.get('/stream-stores', getStreamData);


export default router;