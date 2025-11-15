import roomController from "../../controllers/roomController";
import express from "express";

const router = express.Router();

//Get all rooms
router.get("/", roomController.getAllRooms);    

//Get room by roomID
router.get("/:roomID", roomController.getRoomByID);

//Create new room
router.post("/", roomController.createNewRoom);

//Update room
router.put("/", roomController.updateRoom);

//Delete room
router.delete("/", roomController.deleteRoom);

export default router;
    