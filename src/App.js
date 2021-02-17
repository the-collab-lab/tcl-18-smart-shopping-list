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
        <div className="nav justify-content-center fixed-top bg-light">
          <h1>Smart Shopping List</h1>
        </div>
        <main className="container mt-5 pt-2">
          <AppRoutes />
          <Nav />
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
