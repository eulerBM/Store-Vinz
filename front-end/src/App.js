import './App.css';
import FormLogin from './components/Forms/FormLogin';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormLogin />} />
       
      </Routes>
    </Router>
  );
}

export default App;
