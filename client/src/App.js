import axios from "axios";
import { useEffect, useState } from "react";
import SleepStageChart from "./charts/SleepStageChart";
import WakeupCountChart from "./charts/WakeupCountChart";
import { apiUrl } from "./constants";
import { SLEEP_ENDPOINT } from "./constants/general";
import { getData } from "./helpers";
import ChartSelectors from "./ChartSelectors";
import HRVChart from "./charts/HRVChart";

const NoData = () => <div className="App">Looking for data. . .</div>;

const App = () => {
    const [sleepData, setSleepData] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");
    const [displayedGraph, setDisplayedGraph] = useState("sleepStages");

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
                SLEEP_ENDPOINT,
                accessToken,
                setAccessToken,
                refreshToken,
                setRefreshToken,
                setSleepData
            );
        }
    }, [accessToken, refreshToken]);

    if (!sleepData) {
        return <NoData />;
    }

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <h1>30-Day Sleep Analysis</h1>
                <ChartSelectors
                    displayedGraph={displayedGraph}
                    setDisplayedGraph={setDisplayedGraph}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                {displayedGraph === "sleepStages" && (
                    <SleepStageChart data={sleepData.sleep.reverse()} />
                )}
                {displayedGraph === "wakeups" && (
                    <WakeupCountChart data={sleepData.sleep.reverse()} />
                )}
                {displayedGraph === "hrv" && <HRVChart />}
            </div>
        </div>
    );
};

export default App;
