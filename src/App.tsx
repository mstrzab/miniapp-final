import { useEffect } from 'react';
import { useInitDataRaw } from '@telegram-apps/sdk-react'; // <-- ПРАВИЛЬНЫЙ ХУК
import { useAuthStore } from './store/authStore';
import api from './api';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Spinner from './components/Spinner';

function App() {
  const initDataRaw = useInitDataRaw(); // <-- ПОЛУЧАЕМ СЫРУЮ СТРОКУ
  const { token, setToken, setUser, logout, setLoading, isLoading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const authenticate = async () => {
      if (token) {
        try {
          const response = await api.get('/users/me');
          setUser(response.data);
        } catch (error) {
          logout();
        } finally {
          setLoading(false);
        }
        return;
      }

      if (initDataRaw) { // <-- Используем сырую строку
        try {
          // Отправляем на бэкенд сырую строку, как он и ожидает
          const response = await api.post('/auth/telegram', { init_data: initDataRaw });
          const new_token = response.data.access_token;
          setToken(new_token);
          const userResponse = await api.get('/users/me');
          setUser(userResponse.data);
        } catch (error) {
          console.error('Authentication failed', error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    // Запускаем аутентификацию, как только появляется initDataRaw
    if(initDataRaw !== undefined) {
        authenticate();
    }
  }, [initDataRaw]);

  if (isLoading) {
    return <Spinner />;
  }

  return isAuthenticated ? <HomePage /> : <LoginPage />;
}

export default App;
