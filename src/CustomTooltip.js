import Note from "./Note";

const CustomTooltip = ({ active, payload, label, notes }) => {
    const note = notes.find(
        (note) => note.date === payload[0]?.payload?.dateOfSleep
    );

    if (active && payload && payload.length) {
        return (
            <div>
                <p>{label}</p>
                {payload.map((sleepType, index) => (
                    <span
                        style={{
                            color: sleepType.color,
                            paddingRight: "5px",
                        }}
                        key={`${payload.logId}${index}`}
                    >
                        {sleepType.name}: {sleepType.value}
                        {index !== payload.length - 1 && (
                            <span style={{ color: "black" }}> | </span>
                        )}
                    </span>
                ))}
                {note && <Note note={note} />}
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
