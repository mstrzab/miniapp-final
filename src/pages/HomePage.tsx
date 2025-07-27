import { useAuthStore } from '../store/authStore';
const HomePage = () => {
  const { user } = useAuthStore();
  return ( <div style={{ padding: '20px', color: 'var(--tg-theme-text-color)' }}> <h1>Welcome to TicketSwap!</h1> {user ? ( <div> <p>Hello, {user.first_name || user.username}!</p> <p>Your Telegram ID: {user.telegram_id}</p> </div> ) : ( <p>User data not loaded yet.</p> )} </div> );
};
export default HomePage;
