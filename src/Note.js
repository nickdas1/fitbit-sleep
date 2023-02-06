const Note = ({ note }) => (
    <ul>
        {note.description.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);

export default Note;
