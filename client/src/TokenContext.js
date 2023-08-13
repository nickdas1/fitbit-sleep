import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { apiUrl } from "./constants";

const initialState = {
    accessToken: "",
    refreshToken: "",
};

export const TokenContext = createContext(initialState);

export const TokenContextProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        const getTokens = async () => {
            const res = await axios.get(apiUrl);
            setAccessToken(res.data[0].accessToken);
            setRefreshToken(res.data[0].refreshToken);
        };
        getTokens();
    }, [setAccessToken, setRefreshToken]);

    const value = {
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
    };

    return (
        <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
    );
};
