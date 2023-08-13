import { useContext, useEffect, useState } from "react";
import { CartesianGrid, Label, XAxis, YAxis, BarChart, Bar } from "recharts";
import { getData } from "../helpers";
import { HRV_ENDPOINT } from "../constants/general";
import { TokenContext } from "../TokenContext";

const HRVChart = () => {
    const { accessToken, setAccessToken, refreshToken, setRefreshToken } =
        useContext(TokenContext);
    const [hrvData, setHRVData] = useState();

    useEffect(() => {
        if (accessToken) {
            getData(
                HRV_ENDPOINT,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
                setHRVData
            );
        }
    }, [accessToken, refreshToken, setAccessToken, setRefreshToken]);

    return (
        <BarChart
            width={1400}
            height={700}
            data={hrvData?.hrv}
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
        </BarChart>
    );
};

export default HRVChart;
