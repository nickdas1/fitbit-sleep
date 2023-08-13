const TODAY = new Date();
const TOMORROW = new Date(Date.now() + 3600 * 1000 * 24)
    .toISOString()
    .split("T")[0];
const ONE_MONTH_AGO = new Date(new Date().setDate(TODAY.getDate() - 29))
    .toISOString()
    .split("T")[0];
const TWO_MONTHS_AGO = new Date(new Date().setDate(TODAY.getDate() - 59))
    .toISOString()
    .split("T")[0];

export const CURRENT_MONTH_HRV_ENDPOINT = `https://api.fitbit.com/1/user/-/hrv/date/${ONE_MONTH_AGO}/${TOMORROW}.json`;
export const LAST_MONTH_HRV_ENDPOINT = `https://api.fitbit.com/1/user/-/hrv/date/${TWO_MONTHS_AGO}/${ONE_MONTH_AGO}.json`;
export const SLEEP_ENDPOINT = `https://api.fitbit.com/1.2/user/-/sleep/list.json?beforeDate=${TOMORROW}&offset=0&limit=30&sort=desc`;

export const TOOLTIP_STYLE = {
    background: "#f0f0f0",
    padding: "0 10px 10px",
    border: "2px solid #0077be",
    borderRadius: "5px",
};
