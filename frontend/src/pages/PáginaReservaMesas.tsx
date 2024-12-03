import React, { useState, useEffect } from "react";
import axios from "axios"; // Para chamadas à API
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
  SelectInput,
  UpdateButton,
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
  const [searchTerm, setSearchTerm] = useState(""); // Barra de pesquisa
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservas();
  }, []);

  useEffect(() => {
    // Filtrar reservas com base no nome
    const filtered = reservas.filter((reserva) =>
      reserva.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReservas(filtered);
  }, [searchTerm, reservas]);

  const fetchReservas = async () => {
    try {
      const response = await axios.get("http://localhost:3010/reserva");
      setReservas(response.data);
      setFilteredReservas(response.data); // Inicializa lista filtrada
    } catch (error) {
      console.error("Erro ao buscar reservas:", error);
      setError("Erro ao carregar reservas.");
    }
  };

  const handleSubmit = async () => {
    if (!nome || !mesa || !status || !data || !contato || !horario) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      if (editingId) {
        // Atualizar reserva existente
        const response = await axios.put(`http://localhost:3010/reserva/${editingId}`, {
          nome,
          mesa,
          status,
          data,
          contato,
          horario,
        });
        setReservas(
          reservas.map((reserva) =>
            reserva._id === editingId ? response.data : reserva
          )
        );
      } else {
        // Criar nova reserva
        const response = await axios.post("http://localhost:3010/reserva", {
          nome,
          mesa,
          status,
          data,
          contato,
          horario,
        });
        setReservas([...reservas, response.data]);
      }

      // Resetar os campos
      setNome("");
      setMesa("");
      setStatus("Reservado");
      setData("");
      setContato("");
      setHorario("");
      setEditingId(null);
      setError("");
    } catch (error) {
      console.error("Erro ao salvar reserva:", error);
      setError("Erro ao salvar reserva.");
    }
  };

  const handleEditReserva = (reserva: any) => {
    setNome(reserva.nome);
    setMesa(reserva.mesa);
    setStatus(reserva.status);
    setData(reserva.data);
    setContato(reserva.contato);
    setHorario(reserva.horario);
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
        <SelectInput value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Reservado">Reservado</option>
          <option value="Ocupado">Ocupado</option>
          <option value="Disponível">Disponível</option>
        </SelectInput>



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
          {filteredReservas.map((reserva) => (
            <EventItem key={reserva._id}>
              <Label>Nome: {reserva.nome}</Label>
              <Label>Mesa: {reserva.mesa}</Label>
              <Label>Status: {reserva.status}</Label>
              <Label>Data: {format(new Date(reserva.data), "dd/MM/yyyy")}</Label>
              <Label>Contato: {reserva.contato}</Label>
              <Label>Horário: {reserva.horario}</Label>
              <div>
                <UpdateButton onClick={() => handleEditReserva(reserva)}>
                  Alterar
                </UpdateButton>
                <DeleteButton onClick={() => handleDeleteReserva(reserva._id)}>
                  Excluir
                </DeleteButton>
              </div>
            </EventItem>
          ))}
        </EventListScroll>
      </EventList>
    </Container>
  );
};

export default ReservaDeMesas;
