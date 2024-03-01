import './App.css';
import { Routes,Route } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import axios from './axiosConfig';
import { useEffect,useState ,createContext} from 'react';
import { useNavigate } from 'react-router-dom';

export const AppStateContext = createContext();

function App() {
  const [user, setuser] = useState({});
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get('/users/check', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      setuser(data);
    } catch (error) {
      console.log(error.response);
      navigate('/login');
    }
  }

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <AppStateContext.Provider value={{ user, setuser }}>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes>
  </AppStateContext.Provider>
  );
}
export default App;