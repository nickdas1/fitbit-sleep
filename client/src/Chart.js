import {
    CartesianGrid,
    Label,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from "recharts";
import { NOTES } from "./constants";
import CustomTooltip from "./CustomTooltip";

const tooltipStyle = {
    background: "#f0f0f0",
    padding: "0 10px 10px",
    border: "2px solid #0077be",
    borderRadius: "5px",
};

const Chart = ({ data }) => {
    const getSleepMinutes = (data, sleepType) =>
        data?.levels?.summary[sleepType]?.minutes;

    return (
        <LineChart
            width={1400}
            height={700}
            data={data}
            margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
        >
            <Line
                name="Deep"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "deep")}
                stroke="#0a3161"
                strokeWidth={3}
                connectNulls
            />
            <Line
                name="REM"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "rem")}
                stroke="#87ceeb"
                strokeWidth={3}
                connectNulls
            />
            <Line
                name="Awake"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "wake")}
                stroke="#cc0000"
                strokeWidth={3}
                connectNulls
            />
            <Line
                name="Light"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "light")}
                stroke="#0077be"
                strokeWidth={3}
                connectNulls
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="dateOfSleep" angle={50} tickMargin={25}>
                <Label value="Date" position="insideBottom" offset={-15} />
            </XAxis>
            <YAxis>
                <Label
                    value="Duration (Minutes)"
                    position="insideLeft"
                    angle={-90}
                    offset={-20}
                />
            </YAxis>
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={tooltipStyle}
                notes={NOTES}
                filterNull={false}
            />
            <Legend align="center" verticalAlign="top" />
        </LineChart>
    );
};

export default Chart;
