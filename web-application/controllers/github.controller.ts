import { Request, Response } from "express";
import GithubService from "../services/github.service";
import fetch from 'node-fetch';
export default class GithubController {

    constructor(private githubService: GithubService) { }

employee = async (req:Request, res:Response)  => { 
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.EMPLOYEE_CLIENT_ID}`);
}

employer = async (req:Request, res:Response)  => { 
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.EMPLOYER_CLIENT_ID}`);
}

employee_callback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const body = {
        client_id: process.env.EMPLOYEE_CLIENT_ID,
        client_secret: process.env.EMPLOYEE_CLIENT_SECRET,
        code,
        redirect_uri: `http://localhost:${process.env.PORT}/signin/employee_callback`
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
    // res.redirect(`/?token=${token}`);
    res.redirect(`/signin/employee_user_data?token=${token}`);
    // return token;
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
};

employer_callback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    const body = {
        client_id: process.env.EMPLOYER_CLIENT_ID,
        client_secret: process.env.EMPLOYER_CLIENT_SECRET,
        code,
        redirect_uri: `http://localhost:${process.env.PORT}/signin/employer_callback`
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
    // res.redirect(`/?token=${token}`);
    res.redirect(`/signin/employer_user_data?token=${token}`);
    return token;
} catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
}
};

employee_user_data = async (req: Request, res: Response) => {
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
        const github_username = userData.login;
        const github_id = userData.id;
        const github_token = token;
        await this.githubService.employee_user_data(github_username,github_id,github_token);
        const githubUserData = {
            github_id: userData.id, 
            github_username: userData.login, 
            role: 'employee', 
          };   
          req.session.user = githubUserData;

        return res.redirect(`/?token=${token}`);
        } 

        
        else {
            const errorData = await response.json();
            res.status(response.status).json(errorData); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }

           

};

employer_user_data = async (req: Request, res: Response) => {
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
        const github_username = userData.login;
        const github_id = userData.id;
        const github_token = token;
        await this.githubService.employer_user_data(github_username, github_id,github_token);
        const githubUserData = {
            github_id: userData.id, 
            github_username: userData.login, 
            role: 'employer', 
          };   
          req.session.user = githubUserData;
        return res.redirect(`/?token=${token}`);
            
        } 

        
        else {
            const errorData = await response.json();
            res.status(response.status).json(errorData); 
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
        

};

github_callback = async (req: Request, res: Response) => { 
    const githubUserData = {
      github_id: '123', 
      github_username: 'example_user', 
      role: 'employee', 
    };   
    req.session.user = githubUserData;
    res.redirect('/'); 
}


}
