import React from "react";
import Header from "./componetes/Header";
import Navbar from "./componetes/Navbar";
import Tabla from "./componetes/Tabla";
function App() {
  return (
    <React.StrictMode>
      <Header/>
      <Navbar/>
      <Tabla/>
    </React.StrictMode>
  );
}

export default App;
