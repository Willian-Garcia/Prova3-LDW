import { Request, Response } from "express";
import Reserva from "../models/Reserva";

class ReservaController {
    static async createReserva(req: Request, res: Response): Promise<Response> {
        try {
            const { nome, mesa, data, contato, horario } = req.body;

            if (!nome || !mesa || !data || !contato || !horario) {
                return res.status(400).json({ message: "Todos os campos são obrigatórios." });
            }

            const horariosPadrao = [
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                "14:00", "15:00", "16:00", "17:00", "18:00",
                "19:00", "20:00", "21:00", "22:00"
            ];

            if (!horariosPadrao.includes(horario)) {
                return res.status(400).json({
                    message: "O horário informado não está dentro do intervalo permitido pelo restaurante (08:00 - 22:00)."
                });
            }

            const dataReserva = new Date(data);
            const [hora, minuto] = horario.split(":" ).map(Number);
            dataReserva.setHours(hora, minuto, 0, 0);

            const inicioIntervalo = new Date(dataReserva);
            inicioIntervalo.setHours(inicioIntervalo.getHours() - 1);

            const fimIntervalo = new Date(dataReserva);
            fimIntervalo.setHours(fimIntervalo.getHours() + 1);

            const reservaExistente = await Reserva.findOne({
                mesa: Number(mesa),
                data: {
                    $gte: inicioIntervalo,
                    $lte: fimIntervalo,
                },
            });

            if (reservaExistente) {
                return res.status(400).json({
                    message: "A mesa já está reservada em um horário próximo.",
                });
            }

            const status = "Reservado";

            const novaReserva = new Reserva({ nome, mesa, status, data, contato, horario });
            await novaReserva.save();

            return res.status(201).json(novaReserva);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar reserva." });
        }
    }

    static async getReservas(req: Request, res: Response): Promise<Response> {
        try {
            const reservas = await Reserva.find();
            return res.status(200).json(reservas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar reservas." });
        }
    }

    static async getReservasPorUsuario(req: Request, res: Response): Promise<Response> {
        try {
            const { nome } = req.query;

            if (!nome) {
                return res.status(400).json({ message: "Nome do cliente é obrigatório." });
            }

            const reservas = await Reserva.find({ nome });
            return res.status(200).json(reservas);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar reservas do cliente." });
        }
    }

    static async getReservasPorMesa(req: Request, res: Response): Promise<Response> {
        try {
            const { mesa, data, horario } = req.query;

            if (!mesa || !data || !horario) {
                return res.status(400).json({ message: "Mesa, data e horário são obrigatórios." });
            }

            const reservas = await Reserva.find({
                mesa: Number(mesa),
                data: new Date(data as string),
                horario: horario as string,
            });

            if (reservas.length > 0) {
                return res.status(200).json({ status: reservas[0].status });
            }

            return res.status(200).json({ status: "Disponível" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao buscar reservas da mesa." });
        }
    }

    static async updateReserva(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { nome, mesa, data, contato, horario } = req.body;

            if (!id) {
                return res.status(400).json({ message: "ID da reserva é obrigatório." });
            }

            const horariosPadrao = [
                "08:00", "09:00", "10:00", "11:00", "12:00", "13:00",
                "14:00", "15:00", "16:00", "17:00", "18:00",
                "19:00", "20:00", "21:00", "22:00"
            ];

            if (!horariosPadrao.includes(horario)) {
                return res.status(400).json({
                    message: "O horário informado não está dentro do intervalo permitido pelo restaurante (08:00 - 22:00)."
                });
            }

            const reservaAtualizada = await Reserva.findByIdAndUpdate(
                id,
                { nome, mesa, status: "Reservado", data, contato, horario },
                { new: true, runValidators: true }
            );

            if (!reservaAtualizada) {
                return res.status(404).json({ message: "Reserva não encontrada." });
            }

            return res.status(200).json(reservaAtualizada);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao atualizar reserva." });
        }
    }

    static async deleteReserva(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID da reserva é obrigatório." });
            }

            const reserva = await Reserva.findById(id);

            if (!reserva) {
                return res.status(404).json({ message: "Reserva não encontrada." });
            }

            // Atualizar o status para "Disponível" ao deletar
            await Reserva.findByIdAndDelete(id);

            return res.status(200).json({ message: "Reserva deletada e a mesa foi liberada." });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao deletar reserva." });
        }
    }

    static async verificarDisponibilidade(req: Request, res: Response): Promise<Response> {
        try {
            const { mesa, data, horario } = req.query;
    
            if (!mesa || !data || !horario) {
                return res.status(400).json({ message: "Mesa, data e horário são obrigatórios." });
            }
    
            const reservas = await Reserva.find({
                mesa: Number(mesa),
                data: new Date(data as string),
                horario: horario as string,
            });
    
            if (reservas.length > 0) {
                return res.status(200).json({ status: reservas[0].status });
            }
    
            return res.status(200).json({ status: "Disponível" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Erro ao verificar disponibilidade." });
        }
    }
}    

export default ReservaController;