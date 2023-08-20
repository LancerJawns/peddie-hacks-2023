import express, { json, urlencoded } from 'express';
import prisma from './db/db';
import userRouter from './routes/user/user.route';
import authRouter from './routes/oauth/oauth.route';
import { dayOfWeek, timeToWeekId } from './db/weekly_plant/WeeklyPlant';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// middleware
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cookieParser());
app.use(
    cors({
        origin: 'http://localhost:8081',
        credentials: true,
    })
);

// routers
app.use('/user', userRouter);
app.use('/auth', authRouter);

app.get('/currentWeek', (req, res) =>
    res
        .status(200)
        .send({ weekId: timeToWeekId(new Date()), currentDay: dayOfWeek(new Date()) })
        .end()
);

prisma.$connect();

app.listen(process.env.SERVER_PORT, () => {
    console.log(`Listening on port, ${process.env.SERVER_PORT}`);
});
