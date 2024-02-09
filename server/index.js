require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { wss, wsServer } = require('./websocket');

/**
 * Express application instance.
 *
 * @type {Function}
 * @name app
 * @memberOf global
 * @readonly
 */
const app = express();


app.use(cors());

app.use(express.json());

wsServer.on('request', app); 

wsServer.listen(process.env.WS_PORT,() =>
    console.log(`WS Server started on port ${process.env.WS_PORT}`));

const userRouters = require('./routes/usersRoutes');
const contentRoutes = require('./routes/contentRoutes');

app.use("/api/users", userRouters);
app.use("/api/contents", contentRoutes);


connectDB().then(() => null);

app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
);
