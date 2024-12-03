import { Router } from "express";
import reserva from "./Reserva";

const router = Router();

router.use("/reserva", reserva);

export default router;