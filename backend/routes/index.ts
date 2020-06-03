import { Router } from "express";
import { dataController, loaderController } from "../config/inject-dependencies";
import validateRequest from "../middleware/validate-request";

const router = Router();

router.get("/pokemon", dataController.getAllPokemonData);
router.get("/moves", dataController.getMovesData);
router.put("/moveTypes", validateRequest, loaderController.loadRedisWithMoveTypes);
router.put("/pokemon", validateRequest, loaderController.loadRedisWithPokemonData);

export default router;
