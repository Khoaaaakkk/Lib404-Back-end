import tableController from "../../controllers/tableController";
import express from "express";

const router = express.Router();

// api/tables/
router
    .route("/")
    .get(tableController.getAllTables)
    .post(tableController.createNewTable)
    .put(tableController.updateTable)
    .delete(tableController.deleteTable);

router.route("/:id").get(tableController.getTableByID);

export default router;