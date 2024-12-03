import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 10%;
  gap: 20px;
  align-self: center;
`;

export const EventForm = styled.div`
  display: flex;
  width: 45%;
  height: 550px;
  padding: 30px;
  border: 3px solid #ffffff;
  border-radius: 15px;
  flex-direction: column;
  gap: 20px;
  background: radial-gradient(circle, rgba(0,168,158,1) 0%, rgba(3,43,42,1) 100%);
  justify-content: space-between;
  div {
    display: flex;
    gap: 10px;
  }
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 550px;
  padding: 30px;
  gap: 20px;
  border: 3px solid #ffffff;
  border-radius: 15px;
  background: radial-gradient(circle, rgba(0,168,158,1) 0%, rgba(3,43,42,1) 100%);
  overflow: hidden;
`;


export const EventListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  gap: 7%;
  padding-left: 10px;
  width: 100%;
`;


export const EventListScroll = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 530px;
  padding: 10px;
  gap: 20px;
  border-radius: 4px;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;


export const EventItem = styled.div`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 100%;
`;

export const InputDescricao = styled.textarea`
  display: block;
  height: 200px;
  width: 100%;
  padding: 75px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
  resize: none;
  overflow-wrap: break-word;
  word-wrap: break-word;
  white-space: pre-wrap;
  vertical-align: middle;
  box-sizing: border-box; 
`;

export const Input = styled.input`
  display: block;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
`;

export const SelectInput = styled.select`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
  background-color: #ffffff;
  font-size: 14px;

  &:focus {
    outline: none;
    border: 2px solid #00c9bd;
  }
`;

export const SearchInput = styled.input`
  display: block;
  width: 65%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 10px;
  text-align: center;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #00ffef;
  color: black;
  border: 2px solid #00ffef;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #00c9bd;
    color: black;
    border: 2px solid #00c9bd;
  }
`;

export const UpdateButton = styled.button`
  width: 10%;
  padding: 5px;
  background-color: #2e7772;
  color: white;
  border: 2px solid #2e7772;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #235c58;
    color: white;
    border: 2px solid #235c58;
  }
`;

export const DeleteButton = styled.button`
  width: 10%;
  padding: 5px;
  background-color: #fc4545;
  color: white;
  border: 2px solid #fc4545;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #c93333;
    color: white;
    border: 2px solid #c93333;
  }
`;

export const Label = styled.p`
  margin: 0;
  font-size: 14px;
  color: black;
`;

export const LabelTitle = styled.p`
  font-size: 20px;
  color: white;
  font-weight: bold;
  margin: 0;
  text-align: center;
  padding-right: 10px;
`;


