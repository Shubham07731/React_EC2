
import './App.css';
import Navbar from "./container/Navbar/Navbar";
import Form from './container/Form/Form';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Example from "../src/container/Example/Example";
import Notfound from './container/Notfound/Notfound';
import Api from './Api';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      
      <Routes>
      <Route path='/' exact element={<Form/>}/>
      <Route path="/edit/:id" element={<Example/>} />
      {/* <Route path="/delete/:id" element={<Delete/>} /> */}
      
      <Route element={<Notfound/>}/>
      </Routes>
      </div>
      </Router>
    

  );
}

export default App;
