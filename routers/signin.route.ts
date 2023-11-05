import fetch from 'node-fetch';
import dotenv from "dotenv";
import path from "path";
import { Request, Response, Router } from "express";

declare global {
    var accessToken: string | undefined; 
  }

const signInRoutes = Router();

dotenv.config();
console.log("13326")

signInRoutes.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../public/html/signin.html"));
});

signInRoutes.get('/auth', (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`);
});

signInRoutes.get('/oauth-callback', async ({ query: { code } }, res) => {
    const body = {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: `http://localhost:${process.env.PORT}/signin/oauth-callback`
    };

    const opts = {
        method: 'POST',
        headers: { 'accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    console.log(opts);

try {
    const response = await fetch('https://github.com/login/oauth/access_token', opts);
    const data = await response.json();
    console.log(data);
    const token = data.access_token;
    global.accessToken = token;
    res.redirect(`/?token=${token}`);
    return token;
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
});

signInRoutes.get('/user-data', async (req, res) => {
    const token = global.accessToken;
    
    if (!token) {
        return res.status(400).json({ error: 'Missing access token' });
    }

    try {
        const response = await fetch('https://api.github.com/user', {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`,
                'User-Agent': 'Your-App-Name' 
            }
        });

        if (response.status === 200) {
            const userData = await response.json();
            console.log(userData)
            return res.json(userData); 
        } else {
            const errorData = await response.json();
            return res.status(response.status).json(errorData); 
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' }); 
    }
});

export default signInRoutes;
