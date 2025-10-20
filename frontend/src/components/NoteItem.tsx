export default function NoteItem({note, onSave, onDelete}: any) {
    return(
        <div style={{ border: '1px solid #ddd', padding: 12, borderRadius: 8 }}>
            <strong>{note.title}</strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{note.content}</p>
            <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={() => onSave(note)}>Edit</button>
                <button style={{color: 'red'}} onClick={() => onDelete(note.id)}>Delete</button>
            </div>
        </div>

    );

}