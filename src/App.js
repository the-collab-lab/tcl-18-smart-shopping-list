import React from 'react';
// React Router
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRoutes from 'routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App-Navbar-Top">
          <h1>Smart Shopping List</h1>
        </div>
        <main className="container mt-5 pt-2">
          <AppRoutes />
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
