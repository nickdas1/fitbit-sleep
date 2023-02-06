import Note from "./Note";

const CustomTooltip = ({ active, payload, label, notes }) => {
    const note = notes.find(
        (note) => note.date === payload[0]?.payload?.dateOfSleep
    );

    if (active && payload && payload.length) {
        const startTime = new Date(
            payload[0]?.payload?.startTime
        ).toLocaleTimeString();
        const endTime = new Date(
            payload[0]?.payload?.endTime
        ).toLocaleTimeString();
        const duration = parseFloat(
            payload[0]?.payload.duration / 1000 / 60 / 60
        ).toFixed(2);

        return (
            <div>
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>{label}</p>
                        <p>Duration: {duration} hours</p>
                    </div>
                    <p>Start: {startTime}</p>
                    <p>End: {endTime}</p>
                </div>
                {payload.map((sleepType, index) => (
                    <span
                        style={{
                            color: sleepType.color,
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
