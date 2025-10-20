import { useEffect, useState } from 'react';
import { api, getToken } from '../api';
import { useNavigate } from 'react-router-dom';
import NoteItem from '../components/NoteItem';

export default function Notes() {
    const [list, setList] = useState<any[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [q, setQ] = useState('');
    const nav = useNavigate();

    const load = async (query?: string) => {
        try{
            const data = await api.listNotes(query);
            setList(data);
        }
        catch{
            nav('/login');
        }
    };

    useEffect(() => {
        if (!getToken()) nav('/login'); else load();
    }, []);


    const create = async (e: React.FormEvent) => {
        e.preventDefault();
        await api.createNote(title, content);
        setTitle('');
        setContent('');
        load(q);
    };

    const search = (e: React.FormEvent) => {
        e.preventDefault();
        load(q);
    };

    const onDelete = async (id: string) => { 
        await api.deleteNote(id);
        load(q);
    };

    const onSave = async (note: any) => {
        const newTitle = prompt('New title', note.title);
        const newContent = prompt('New content', note.content);
        if(newTitle !== null || newContent !== null){
            await api.updateNote(note.id, {title: newTitle ?? note.title, content: newContent ?? note.content});
            load(q);
        }
    };
    return(
        <div style={{ display: 'grid', gap: 16 }}>
            <form onSubmit={create} style={{ display: 'grid', gap: 8 }}>
                <h3>Create Note</h3>
                <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
                <button>Add</button>
            </form>

            <form onSubmit={search} style={{ display: 'flex', gap: 8 }}>
                <input placeholder="Search by title..." value={q} onChange={e => setQ(e.target.value)} />
                <button>Search</button>
            </form>

            <div style={{display: 'grid', gap: 8}}>
                {list.map((n) => (
                    <NoteItem key={n.id} note={n} onDelete={onDelete} onSave={onSave} />
                    ))}
            </div>
        </div>
    );

}