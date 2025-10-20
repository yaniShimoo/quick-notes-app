import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getToken, setToken } from './api';

export default function App() {
  const nav = useNavigate();
  const logged = !!getToken();

  return (
    <div style={{ maxWidth: 920, margin: '0 auto', padding: 24 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{paddingRight: '50px'}}>📒 Notes</h1>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/">Home</Link>
          {!logged && <Link to="/login">Login</Link>}
          {!logged && <Link to="/register">Registration</Link>}
          {logged && (
            <button onClick={() => { setToken(null); nav('/login'); }}>Logout</button>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
