import React from 'react';
// React Router
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from 'routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-Navbar-Top fixed-top">
          <h1>Smart Shopping List</h1>
        </div>
        <main className="container mt-5 p-3">
          <AppRoutes />
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
