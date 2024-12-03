import React from 'react';
import ReservaDeMesas from './pages/PáginaReservaMesas';
import { GlobalStyle } from './pages/GlobalStyles';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ReservaDeMesas />
    </>
  );
};

export default App;