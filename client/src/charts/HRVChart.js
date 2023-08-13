import { useContext, useEffect, useState } from "react";
import {
    CartesianGrid,
    Label,
    XAxis,
    YAxis,
    BarChart,
    Bar,
    Tooltip,
} from "recharts";
import { getData } from "../helpers";
import {
    CURRENT_MONTH_HRV_ENDPOINT,
    LAST_MONTH_HRV_ENDPOINT,
} from "../constants/general";
import { TokenContext } from "../TokenContext";
import { NoData } from "../NoData";

const DefaultHRVChart = ({ data }) => {
    return (
        <BarChart
            width={950}
            height={475}
            data={data}
            margin={{ top: 20, right: 30, bottom: 60, left: 30 }}
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
            <Tooltip />
        </BarChart>
    );
};

const HRVChart = () => {
    const { accessToken, setAccessToken, refreshToken, setRefreshToken } =
        useContext(TokenContext);
    const [currentHRVData, setCurrentHRVData] = useState();
    const [previousHRVData, setPreviousHRVData] = useState();

    useEffect(() => {
        if (accessToken) {
            getData(
                CURRENT_MONTH_HRV_ENDPOINT,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
                setCurrentHRVData
            );
            getData(
                LAST_MONTH_HRV_ENDPOINT,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
                setPreviousHRVData
            );
        }
    }, [accessToken, refreshToken, setAccessToken, setRefreshToken]);

    if (!currentHRVData) {
        return <NoData />;
    }

    return (
        <>
            <DefaultHRVChart data={previousHRVData.hrv} />
            <DefaultHRVChart data={currentHRVData.hrv} />
        </>
    );
};

export default HRVChart;
