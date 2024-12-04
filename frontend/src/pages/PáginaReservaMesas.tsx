import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Container,
  DeleteButton,
  EventForm,
  EventItem,
  EventList,
  EventListHeader,
  EventListScroll,
  Input,
  Label,
  LabelTitle,
  SearchInput,
  UpdateButton,
  Dropdown,
  DropdownOption,
} from "./styles";
import { format } from "date-fns";
import { Reserva } from "../types";

const ReservaDeMesas: React.FC = () => {
  const [nome, setNome] = useState("");
  const [mesa, setMesa] = useState<number | "">("");
  const [status, setStatus] = useState("Reservado");
  const [data, setData] = useState("");
  const [contato, setContato] = useState("");
  const [horario, setHorario] = useState("");
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [filteredReservas, setFilteredReservas] = useState<Reserva[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservas();
  }, []);

  useEffect(() => {
    const filtered = reservas.filter((reserva) =>
      reserva.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReservas(filtered);
  }, [searchTerm, reservas]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:3010/reserva");
      setReservas(response.data);
      setFilteredReservas(response.data);
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setError("Erro ao carregar reservas.");
    }
  };

  const handleSubmit = async () => {
    if (!nome || !mesa || !data || !contato || !horario) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      const reservaData = {
        nome,
        mesa: Number(mesa),
        status,
        data: new Date(data).toISOString(),
        contato,
        horario,
      };

      console.log("Payload enviado:", reservaData);

      if (editingId) {
        const response = await axios.put(`http://localhost:3010/reserva/${editingId}`, reservaData);
        setReservas(
          reservas.map((reserva) =>
            reserva._id === editingId ? response.data : reserva
          )
        );
      } else {
        const response = await axios.post("http://localhost:3010/reserva", reservaData);
        setReservas([...reservas, response.data]);
      }

      setNome("");
      setMesa("");
      setData("");
      setContato("");
      setHorario("");
      setStatus("Reservado");
      setEditingId(null);
      setError("");
    } catch (error) {
      console.error("Erro ao salvar reserva:", error);
      setError("Erro ao salvar reserva.");
    }
  };

  const handleEditReserva = (reserva: Reserva) => {
    setNome(reserva.nome);
    setMesa(reserva.mesa);
    setData(reserva.data.split("T")[0]);
    setContato(reserva.contato);
    setHorario(reserva.horario);
    setStatus(reserva.status);
    setEditingId(reserva._id);
  };

  const handleDeleteReserva = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3010/reserva/${id}`);
      setReservas(reservas.filter((reserva) => reserva._id !== id));
    } catch (error) {
      console.error("Erro ao deletar reserva:", error);
      setError("Erro ao deletar reserva.");
    }
  };

  return (
    <Container>
      <EventForm>
        <LabelTitle>Gerenciador de Reservas</LabelTitle>
        <Input
          type="text"
          placeholder="Nome do Cliente"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Contato do Cliente: cliente@example.com"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <Input
          type="date"
          placeholder="Data da Reserva"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <Input
          type="time"
          placeholder="Horário da Reserva"
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Número da Mesa"
          value={mesa}
          onChange={(e) => setMesa(Number(e.target.value))}
        />
        <Dropdown value={status} onChange={(e) => setStatus(e.target.value)}>
          <DropdownOption value="Reservado">Reservado</DropdownOption>
          <DropdownOption value="Disponível">Disponível</DropdownOption>
          <DropdownOption value="Cancelado">Cancelado</DropdownOption>
        </Dropdown>
        {error && <Label style={{ color: "red" }}>{error}</Label>}
        <Button onClick={handleSubmit}>
          {editingId ? "Atualizar Reserva" : "Cadastrar Reserva"}
        </Button>
      </EventForm>

      <EventList>
        <EventListHeader>
          <SearchInput
            type="text"
            placeholder="Pesquisar por Nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <LabelTitle>Total de Reservas: {reservas.length}</LabelTitle>
        </EventListHeader>
        <EventListScroll>
          {filteredReservas.map((reserva) => {
            const dataValida = reserva.data ? new Date(reserva.data) : null;

            return (
              <EventItem key={reserva._id}>
                <Label>Nome: {reserva.nome}</Label>
                <Label>Mesa: {reserva.mesa}</Label>
                <Label>Status: {reserva.status}</Label>
                <Label>
                  Data: {dataValida ? format(dataValida, "dd/MM/yyyy") : "Data inválida"}
                </Label>
                <Label>Contato: {reserva.contato}</Label>
                <Label>Horário: {reserva.horario || "Horário inválido"}</Label>
                <div>
                  <UpdateButton onClick={() => handleEditReserva(reserva)}>
                    Alterar
                  </UpdateButton>
                  <DeleteButton onClick={() => handleDeleteReserva(reserva._id)}>
                    Excluir
                  </DeleteButton>
                </div>
              </EventItem>
            );
          })}
        </EventListScroll>
      </EventList>
    </Container>
  );
};

export default ReservaDeMesas;
