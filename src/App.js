import axios from "axios";
import { useEffect, useState } from "react";
import { ACCESS_TOKEN, ENCODED_CLIENT_INFO, REFRESH_TOKEN } from "./constants";

const App = () => {
    const [sleepData, setSleepData] = useState();
    const [accessToken, setAccessToken] = useState(ACCESS_TOKEN);
    const [refreshToken, setRefreshToken] = useState(REFRESH_TOKEN);

    useEffect(() => {
        const resetToken = async () => {
            await axios
                .post(
                    `https://api.fitbit.com/oauth2/token?grant_type=refresh_token&refresh_token=${refreshToken}`,
                    {},
                    {
                        headers: {
                            Authorization: "Basic " + ENCODED_CLIENT_INFO,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                )
                .then((res) => {
                    setAccessToken(res.data.access_token);
                    setRefreshToken(res.data.refreshToken);
                });
        };

        const getSleepData = async () => {
            const response = await axios
                .get(
                    "https://api.fitbit.com/1.2/user/-/sleep/list.json?afterDate=2023-01-01&offset=0&limit=100&sort=desc",
                    { headers: { Authorization: "Bearer " + accessToken } }
                )
                .catch((err) => {
                    if (hasInvalidToken(err.response.data)) {
                        resetToken();
                        return;
                    }
                });
            if (response?.data) {
                console.log(response.data);
                setSleepData(response.data);
            }
        };
        getSleepData();
    }, [accessToken, refreshToken]);

    const hasInvalidToken = (data) => {
        return data?.errors?.some(
            (error) => error.errorType === "invalid_token"
        );
    };

    if (!sleepData) {
        return <div className="App">Looking for data. . .</div>;
    }

    return (
        <div className="App">
            <h1>Fitbit App</h1>
            {sleepData.sleep.map((sleep) => {
                const { summary } = sleep.levels;
                return (
                    <div key={sleep.logId}>
                        <h3>Date: {sleep.dateOfSleep}</h3>
                        <ul>
                            <li>Deep: {summary.deep.minutes} minutes</li>
                            <li>REM: {summary.rem.minutes} minutes</li>
                            <li>Light: {summary.light.minutes} minutes</li>
                            <li>Wake: {summary.wake.minutes} minutes</li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
};

export default App;
