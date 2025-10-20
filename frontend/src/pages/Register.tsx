import { useState } from "react";
import { api, setToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const nav = useNavigate();

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const { accessToken } = await api.register(email, password);
            setToken(accessToken);
            nav('/');
        }
        catch (e: any) {
            setError(e.message || 'Registration failed');
        }
    }

    return (
        <form onSubmit={submit} style={{ display: 'grid', gap: 12, maxWidth: 360 }}>
            <h2>Registeration</h2>
            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} type="email" required />
            <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button style={{backgroundColor: "orange"}}>Sign up</button>
            <small>Already have an account? <Link style={{color: 'orange'}} to="/login">Login</Link></small>
        </form>
    );

}