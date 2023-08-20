import { Router, Request } from 'express';
import { getAllWeeklyPlants, getOrCreateCurrentWeek } from '../../../db/weekly_plant/WeeklyPlant';
import multer from 'multer';
import { recognizeTrash } from '../../../trash-recognizer/recognizeTrash';
import { WeeklyPlant } from '@prisma/client';
import prisma from '../../../db/db';
import { validate } from '../../../validator';
import { body } from 'express-validator';
import { getUserById } from '../../../db/user/User';

export interface PlantRequest extends Request {
    plant: WeeklyPlant;
}

const plantRouter = Router();

plantRouter.use(async (req, res, next) => {
    getOrCreateCurrentWeek(req.userId!)
        .then((current: WeeklyPlant | undefined) => {
            if (!current) {
                console.error('No current week found');
                return res.status(500).end();
            }

            req.plant = current;
            next();
        })
        .catch((err) => {
            console.error('Error while getting current week: ' + err);
            return res.status(500).end();
        });
});

plantRouter.get('/current', async (req, res) => {
    // return data on the user (including user id)

    const user = await getUserById(req.userId!);

    if (!user) return res.status(400).json({ message: 'User not found' });

    res.status(200)
        .json({
            plant: {
                weekId: req.plant?.weekId,
                score: req.plant?.plantScore,
                streak: user.streak,
                trashStatus: getTrashStatus(req.plant?.trashStatus!),
            },
        })
        .end();
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

plantRouter.post('/uploadPlantImage', upload.none(), async (req, res) => {
    if (!req.body.trash) return res.status(400).json({ message: 'Missing image' });
    const { trash } = req.body;
    // if (req.file.mimetype !== 'image/jpeg')
    // return res.status(400).json({ message: "File MIME type must be 'image/jpeg'" });

    // slce the preheader thing off
    let regex = /^data:.+\/(.+);base64,(.*)$/;

    let matches = trash.match(regex);
    let data = matches[2];

    const isTrash = recognizeTrash(Buffer.from(data, 'base64'));

    if (!isTrash) return res.status(401).json({ message: 'Could not recognize trash' });

    const lastUpdated = req.plant?.updatedAt?.getTime() ?? 0;

    const currentDay = new Date().getDay();

    let trashStatus = req.plant?.trashStatus;
    if (!trashStatus) trashStatus = '0000000';
    trashStatus = trashStatus.slice(0, currentDay) + '1' + trashStatus.slice(currentDay + 1);

    const user = await getUserById(req.userId!);

    if (!user) return res.status(400).json({ message: 'User not found' });

    const streak =
        lastUpdated === 0
            ? (user.streak ?? 0) + 1
            : Date.now() - lastUpdated >= 36 * 60 * 60 * 1000
            ? 0
            : Date.now() - lastUpdated >= 12 * 60 * 60 * 1000
            ? (user.streak ?? 0) + 1
            : user.streak;

    prisma.user
        .update({
            where: { id: req.userId },
            data: {
                streak,
            },
        })
        .then(() => {})
        .catch((err: any) => {
            console.log(err);
        });

    prisma.weeklyPlant
        .update({
            where: { id: req.plant?.id },
            data: {
                plantScore: (req.plant?.plantScore ?? 0) + 1,
                updatedAt: new Date(),
                trashStatus,
            },
        })
        .then(() => {
            res.status(200).json({ message: 'Successfully gotten trash' });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                message: `Error while updating plant score: ${err.message}`,
            });
        });
});

const getTrashStatus = (status: string) => {
    const trashArr = [];
    const dayOfWeek = new Date().getDay();
    for (let i = 0; i < status.length; i++) {
        switch (status[i]) {
            case '0':
                trashArr.push(i >= dayOfWeek ? 'UNENTERED' : 'NOT_PICKED_UP');
                break;
            case '1':
                trashArr.push('PICKED_UP');
                break;
        }
    }
    return trashArr;
};

plantRouter.get('/weeklyPlants', async (req, res) => {
    await getOrCreateCurrentWeek(req.userId!); // make sure they have a plant for this week

    const weeklyPlant = await getAllWeeklyPlants(req.userId!);

    res.status(200).json({
        plants: weeklyPlant.map((e) => ({
            weekId: e.weekId,
            plantScore: e.plantScore,
            trashStatus: getTrashStatus(e.trashStatus),
        })),
    });
});

export default plantRouter;
