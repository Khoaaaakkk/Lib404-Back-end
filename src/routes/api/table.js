import tableController from "../../controllers/tableController";
import express from "express";

const router = express.Router();

//Get all tables
router.get("/", tableController.getAllTables);

//Get table by roomID
router.get("/room/:roomID", tableController.getTableByRoomID);

//Create new table
router.post("/", tableController.createNewTable);

//Update table
router.put("/:id", tableController.updateTable);

//Update table availability
router.patch("/availability/:id", tableController.updateTableAvailability);

//Delete table
router.delete("/:id", tableController.deleteTable);

export default router;