import {Client} from 'pg';
import express from "express";

const app = express();

// expects connection string or an object
// const postgressClient = new Client("postgresql://neondb_owner:npg_ifxR7aeQHLX8@ep-shy-firefly-a5hbw2cj-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require")      

const pgClient = new Client({
    user: "neondb_owner",
    password: "npg_ifxR7aeQHLX8",
    port: 5432,
    host: "ep-shy-firefly-a5hbw2cj-pooler.us-east-2.aws.neon.tech",
    database: "neondb",
    ssl: true
});

async function main(){
    await pgClient.connect();
    // const response = await pgClient.query("SELECT * FROM users;");
    const response = await pgClient.query("UPDATE users SET email='sujaynandi@123' WHERE id=4");
    console.log(response.rows);
}
main();
app.use(express.json());

app.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    // const inserQuery = `INSERT INTO users (username, email, password) VALUES ('${username}',' ${email}', '${password}')`; // this way can sql injection can happen
    const insertQuery = `insert into users (username, email, password) values($1, $2, $3);`;

    const response = await pgClient.query(insertQuery, [username, email, password]);

    res.json({
        message: "You are sigined up!"
    });

});

app.listen(3000);