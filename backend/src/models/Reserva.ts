import mongoose, { Schema, Document } from "mongoose";

interface IReserva extends Document {
    nome: string;
    mesa: number;
    status: string;
    data: Date;
    contato: string;
    horario: string;
}

const ReservaSchema = new Schema<IReserva>({
    nome: {
        type: String,
        maxLength: 200,
        minlength: 3,
        required: true,
    },
    mesa: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Reservado", "Ocupado", "Disponível"],
        default: "Disponível",
        required: true,
    },
    data: {
        type: Date,
        required: true,
    },
    contato: {
        type: String,
        required: true,
    },
    horario: {
        type: String,
        required: true,
        validate: {
            validator: function (v: string) {
                return /^([01]?\d|2[0-3]):([0-5]\d)$/.test(v);
            },
            message: props => `${props.value} não é um horário válido no formato HH:mm!`
        }
    }
});

export default mongoose.model<IReserva>("Reserva", ReservaSchema, "Reservas");
