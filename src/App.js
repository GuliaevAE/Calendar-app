
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Calendar from './components/calendar';

function App() {
  return (

    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>

    
  );
}

export default App;
