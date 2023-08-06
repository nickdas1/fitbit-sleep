import axios from "axios";
import { useEffect, useState } from "react";
import SleepStageChart from "./SleepStageChart";
import WakeupCountChart from "./WakeupCountChart";
import { apiUrl } from "./constants";
import { hasInvalidToken, resetToken } from "./helpers";

const App = () => {
    const [sleepData, setSleepData] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [displayedGraph, setDisplayedGraph] = useState("sleepStages");
    const tomorrow = new Date(Date.now() + 3600 * 1000 * 24)
        .toISOString()
        .split("T")[0];

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
                    `https://api.fitbit.com/1.2/user/-/sleep/list.json?beforeDate=${tomorrow}&offset=0&limit=30&sort=desc`,
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
                setSleepData(response.data.sleep.reverse());
            }
        };
        if (accessToken) {
            getSleepData();
        }
    }, [accessToken, refreshToken, tomorrow]);

    if (!sleepData) {
        return <div className="App">Looking for data. . .</div>;
    }

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <h1>30-Day Sleep Analysis</h1>
                <input
                    type="radio"
                    id="sleepstages"
                    value="sleepStages"
                    name="graph"
                    checked={displayedGraph === "sleepStages"}
                    onClick={(e) => setDisplayedGraph(e.target.value)}
                />
                <label htmlFor="sleepstages">Sleep Stages</label>
                <input
                    type="radio"
                    id="wakeups"
                    value="wakeups"
                    name="graph"
                    checked={displayedGraph === "wakeups"}
                    onClick={(e) => setDisplayedGraph(e.target.value)}
                />
                <label htmlFor="wakeups">Wakeups</label>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {displayedGraph === "sleepStages" && (
                    <SleepStageChart data={sleepData} />
                )}
                {displayedGraph === "wakeups" && (
                    <WakeupCountChart data={sleepData} />
                )}
            </div>
        </div>
    );
};

export default App;
