import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";
import { hasInvalidToken, resetToken } from "./helpers";

const App = () => {
    const [sleepData, setSleepData] = useState();
    const [accessToken, setAccessToken] = useState(ACCESS_TOKEN);
    const [refreshToken, setRefreshToken] = useState(REFRESH_TOKEN);

    console.log(sleepData);

    useEffect(() => {
        const getSleepData = async () => {
            const response = await axios
                .get(
                    "https://api.fitbit.com/1.2/user/-/sleep/list.json?afterDate=2023-01-01&offset=0&limit=30&sort=asc",
                    { headers: { Authorization: "Bearer " + accessToken } }
                )
                .catch((err) => {
                    if (hasInvalidToken(err.response.data)) {
                        resetToken(
                            refreshToken,
                            setAccessToken,
                            setRefreshToken
                        );
                        return;
                    }
                });
            if (response?.data) {
                setSleepData(response.data);
            }
        };
        getSleepData();
    }, [accessToken, refreshToken]);

    if (!sleepData) {
        return <div className="App">Looking for data. . .</div>;
    }

    return (
        <div className="App">
            <h1 style={{ textAlign: "center" }}>30-Day Sleep Analysis</h1>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Chart data={sleepData.sleep} />
            </div>
        </div>
    );
};

export default App;
