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
};

const Chart = ({ data }) => {
    const getSleepMinutes = (data, sleepType) =>
        data.levels.summary[sleepType].minutes;

    return (
        <LineChart
            width={1200}
            height={600}
            data={data}
            margin={{ top: 20, right: 50, bottom: 20, left: 50 }}
        >
            <Line
                name="Deep"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "deep")}
                stroke="#0a3161"
            />
            <Line
                name="REM"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "rem")}
                stroke="#87ceeb"
            />
            <Line
                name="Awake"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "wake")}
                stroke="#cc0000"
            />
            <Line
                name="Light"
                type="monotone"
                dataKey={(data) => getSleepMinutes(data, "light")}
                stroke="#0077be"
            />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="dateOfSleep">
                <Label value="Date" position="insideBottom" offset={-15} />
            </XAxis>
            <YAxis>
                <Label
                    value="Duration (Minutes)"
                    position="insideLeft"
                    angle={-90}
                    offset={-30}
                />
            </YAxis>
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={tooltipStyle}
                notes={NOTES}
            />
            <Legend align="center" verticalAlign="top" />
        </LineChart>
    );
};

export default Chart;
