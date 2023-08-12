export const TOMORROW = new Date(Date.now() + 3600 * 1000 * 24)
    .toISOString()
    .split("T")[0];

const TODAY = new Date();
export const ONEMONTHAGO = new Date(new Date().setDate(TODAY.getDate() - 29))
    .toISOString()
    .split("T")[0];

export const tooltipStyle = {
    background: "#f0f0f0",
    padding: "0 10px 10px",
    border: "2px solid #0077be",
    borderRadius: "5px",
};
