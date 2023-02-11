import {
    CartesianGrid,
    Label,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    Tooltip,
} from "recharts";

const WakeupCountChart = ({ data }) => {
    const getNumberOfWakeups = (data) =>
        data?.levels?.shortData?.filter((item) => item.level === "wake").length;

    return (
        <BarChart
            width={1400}
            height={700}
            data={data}
            margin={{ top: 20, right: 50, bottom: 60, left: 50 }}
        >
            <Bar dataKey={(data) => getNumberOfWakeups(data)} fill="#cc0000" />
            <CartesianGrid stroke="#ccc" strokeDasharray="4" vertical={false} />
            <XAxis dataKey="dateOfSleep" angle={50} tickMargin={25}>
                <Label value="Date" position="insideBottom" offset={-60} />
            </XAxis>
            <YAxis>
                <Label
                    value="Number of Wakeups"
                    position="insideLeft"
                    angle={-90}
                    offset={-10}
                />
            </YAxis>
            <Tooltip />
        </BarChart>
    );
};

export default WakeupCountChart;
