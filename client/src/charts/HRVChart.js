import {
    CartesianGrid,
    Label,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    Tooltip,
} from "recharts";
import { NOTES } from "../constants";
import { tooltipStyle } from "../constants/general";
import CustomTooltip from "../CustomTooltip";

const HRVChart = ({ data }) => {
    return (
        <BarChart
            width={1400}
            height={700}
            data={data}
            margin={{ top: 20, right: 50, bottom: 60, left: 50 }}
        >
            <Bar dataKey={(data) => data.value.dailyRmssd} fill="#82ca9d" />
            <CartesianGrid stroke="#ccc" strokeDasharray="4" vertical={false} />
            <XAxis dataKey="dateTime" angle={50} tickMargin={25} interval={0}>
                <Label value="Date" position="insideBottom" offset={-60} />
            </XAxis>
            <YAxis>
                <Label
                    value="HRV"
                    position="insideLeft"
                    angle={-90}
                    offset={-10}
                />
            </YAxis>
            <Tooltip
                content={<CustomTooltip />}
                wrapperStyle={tooltipStyle}
                notes={NOTES}
                filterNull={false}
            />
        </BarChart>
    );
};

export default HRVChart;
