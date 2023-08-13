import ChartDisplay from "./ChartDisplay";
import { TokenContextProvider } from "./TokenContext";

const App = () => {
    return (
        <div className="App">
            <TokenContextProvider>
                <ChartDisplay />
            </TokenContextProvider>
        </div>
    );
};

export default App;
