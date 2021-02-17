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
        <div className="main-title">
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
