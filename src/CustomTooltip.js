const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div>
                <p>{label}</p>
                {payload.map((sleepType, index) => (
                    <span
                        style={{ color: sleepType.color, paddingRight: "5px" }}
                        key={`${payload.logId}${index}`}
                    >
                        {sleepType.name}: {sleepType.value}{" "}
                        {index !== payload.length - 1 && (
                            <span style={{ color: "black" }}> | </span>
                        )}
                    </span>
                ))}
                <p>Lorem ipsum dolor sit amet</p>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
