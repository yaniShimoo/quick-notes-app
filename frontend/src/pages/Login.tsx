import { useState } from 'react';
import { api, setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);   
    try {
        const { accessToken } = await api.login(email, password);
        setToken(accessToken);
        nav('/');
    }
    catch (e: any) {
        setError(e.message || 'Login failed');
    }
    };

    return (
        <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
            <h2>Login</h2>
            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p style={{ color: 'crimson' }}>{error}</p>}
            <button style={{backgroundColor: 'orange'}}>Sign in</button>
            <small>Don’t have an account? <Link style={{color: 'orange'}} to="/register">Register</Link></small>
        </form>
    );

}