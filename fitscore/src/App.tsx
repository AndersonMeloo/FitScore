import { Routes, Route } from "react-router-dom";
import Registrar from "./pages/Usuario/Registrar";
import Sidebar from "./components/SideBar";
import Login from "./pages/Usuario/Login";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";

function App() {

  return (

    <>
      <div style={{ display: "flex" }}>

        <Sidebar />
        
         <div className="flex-1 p-4 md:p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/form" element={<Form />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </>

  );
}

export default App;
