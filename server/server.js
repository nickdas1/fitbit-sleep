const express = require("express");
const { getDbConnection, initializeDbConnection } = require("./db");
const cors = require("cors");
const { ObjectId } = require("mongodb");
const { documentId } = require("./constants");
require("dotenv").config();

const PORT = process.env.port || 8080;

const app = express();
app.use(cors());

app.use(express.json());

app.get("/oauth", async (req, res) => {
    const db = getDbConnection("sleepTracker");
    const tokens = await db
        .collection("tokens")
        .find({ _id: new ObjectId(documentId) })
        .toArray();
    res.send(tokens);
});

app.put("/oauth", async (req, res) => {
    const db = getDbConnection("sleepTracker");
    const { accessToken, refreshToken } = req.body;
    const response = await db
        .collection("tokens")
        .updateOne(
            { _id: new ObjectId(documentId) },
            { $set: { accessToken, refreshToken } }
        );

    response.matchedCount > 0 ? res.sendStatus(200) : res.sendStatus(500);
});

initializeDbConnection().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
    });
});
