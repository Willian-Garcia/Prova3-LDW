import { Router } from "express";
import {ReservaController} from "../controllers";

const router = Router();

router.post("/", ReservaController.createReserva);
router.get("/", ReservaController.getReservas);
router.get("/cliente", ReservaController.getReservasPorUsuario);
router.get("/mesa", ReservaController.getReservasPorMesa);
router.get("/disponibilidade", ReservaController.verificarDisponibilidade);
router.put("/:id", ReservaController.updateReserva);
router.delete("/:id", ReservaController.deleteReserva);

export default router;