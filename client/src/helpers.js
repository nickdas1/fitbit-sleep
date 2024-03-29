import axios from "axios";
import { apiUrl, ENCODED_CLIENT_INFO } from "./constants";

export const hasInvalidToken = (data) => {
    return data?.errors?.some(
        (error) =>
            error.errorType === "invalid_token" ||
            error.errorType === "expired_token"
    );
};

export const updateTokens = async (accessToken, refreshToken) => {
    await axios.put(apiUrl, {
        accessToken,
        refreshToken,
    });
};

export const resetToken = async (
    refreshToken,
    accessTokenSetter,
    refreshTokenSetter
) => {
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
            updateTokens(res.data.access_token, res.data.refresh_token);
            accessTokenSetter(res.data.access_token);
            refreshTokenSetter(res.data.refresh_token);
        });
};

export const getData = async (
    endpoint,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    setData
) => {
    const response = await axios
        .get(endpoint, { headers: { Authorization: "Bearer " + accessToken } })
        .catch((err) => {
            if (hasInvalidToken(err.response.data)) {
                resetToken(refreshToken, setAccessToken, setRefreshToken);
                return;
            }
        });
    if (response?.data) {
        setData(response.data);
    }
};
