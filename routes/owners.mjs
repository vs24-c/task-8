import { Router } from "express";
import OwnersController from "../controller/ownersController.mjs";
import OwnersValidate from '../validate/ownersValidate.mjs';

const router = Router();

router.get("/", OwnersController.getOwnersList); 

router.get("/add/:id?", OwnersController.getAddForm)

router.post('/add/:id?'
  ,OwnersValidate.ownerValidationRules
  , OwnersController.addOwner);
  
router.get('/client/:id', OwnersController.getClientShow);

router.delete("/:id", OwnersController.deleteOwner)

export default router;
