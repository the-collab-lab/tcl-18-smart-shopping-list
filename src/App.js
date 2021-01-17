import React from 'react';
// React Router
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from 'routes/AppRoutes';
import Nav from 'components/Nav';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        <Nav />
      </BrowserRouter>
    </div>
  );
}
export default App;
