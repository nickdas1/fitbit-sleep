import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "./Chart";
import { ACCESS_TOKEN, REFRESH_TOKEN, apiUrl } from "./constants";
import { hasInvalidToken, resetToken } from "./helpers";

const App = () => {
    const [sleepData, setSleepData] = useState();
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
        if (accessToken) {
            getSleepData();
        }
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
