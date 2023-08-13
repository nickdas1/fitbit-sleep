import axios from "axios";
import { useEffect, useState } from "react";
import { CartesianGrid, Label, XAxis, YAxis, BarChart, Bar } from "recharts";
import { apiUrl } from "../constants";
import { getData } from "../helpers";
import { HRV_ENDPOINT } from "../constants/general";

const HRVChart = () => {
    const [hrvData, setHRVData] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        const getTokens = async () => {
            const res = await axios.get(apiUrl);
            setAccessToken(res.data[0].accessToken);
            setRefreshToken(res.data[0].refreshToken);
        };
        getTokens();
    }, []);

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
    }, [accessToken, refreshToken]);

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
