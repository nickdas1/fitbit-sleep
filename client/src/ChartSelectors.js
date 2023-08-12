const ChartSelectors = ({ displayedGraph, setDisplayedGraph }) => (
    <>
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
        <input
            type="radio"
            id="hrv"
            value="hrv"
            name="graph"
            checked={displayedGraph === "hrv"}
            onClick={(e) => setDisplayedGraph(e.target.value)}
        />
        <label htmlFor="hrv">HRV</label>
    </>
);

export default ChartSelectors;
