import { useContext, useEffect, useState } from "react";
import SleepStageChart from "./charts/SleepStageChart";
import WakeupCountChart from "./charts/WakeupCountChart";
import { SLEEP_ENDPOINT } from "./constants/general";
import { getData } from "./helpers";
import ChartSelectors from "./ChartSelectors";
import HRVChart from "./charts/HRVChart";
import { TokenContext } from "./TokenContext";

const NoData = () => <div className="App">Looking for data. . .</div>;

export const ChartDisplay = () => {
    const { accessToken, setAccessToken, refreshToken, setRefreshToken } =
        useContext(TokenContext);

    const [sleepData, setSleepData] = useState();
    const [displayedGraph, setDisplayedGraph] = useState("sleepStages");

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
    }, [accessToken, refreshToken, setAccessToken, setRefreshToken]);

    if (!sleepData) {
        return <NoData />;
    }

    return (
        <>
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
        </>
    );
};

export default ChartDisplay;
