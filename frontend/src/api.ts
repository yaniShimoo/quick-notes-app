export function setToken(token: string | null) {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
}

//gets use`r token
export function getToken() {
    return localStorage.getItem('token');
}


async function request(path: string, opts: RequestInit = {}) {
const token = getToken();
const headers: any = { 'Content-Type': 'application/json', ...(opts.headers || {}) };

if (token) 
    headers['Authorization'] = `Bearer ${token}`;

const res = await fetch(`${api}${path}`, { ...opts, headers });

if (!res.ok) 
    throw new Error(await res.text());

return res.json();
}


export const api = {
    register: (email: string, password: string) => request('/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) }),
    login: (email: string, password: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
    listNotes: (q?: string) => request(`/notes${q ? `?q=${encodeURIComponent(q)}` : ''}`),
    createNote: (title: string, content: string) => request('/notes', { method: 'POST', body: JSON.stringify({ title, content }) }),
    updateNote: (id: string, data: any) => request(`/notes/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
    deleteNote: (id: string) => request(`/notes/${id}`, { method: 'DELETE' }),
};