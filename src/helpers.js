import axios from "axios";
import { ENCODED_CLIENT_INFO } from "./constants";

export const hasInvalidToken = (data) => {
    return data?.errors?.some((error) => error.errorType === "invalid_token");
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
            accessTokenSetter(res.data.access_token);
            refreshTokenSetter(res.data.refresh_token);
        });
};
