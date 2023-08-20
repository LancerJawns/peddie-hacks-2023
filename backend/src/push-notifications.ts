import PushNotifications from "node-pushnotifications";

import { schedule } from "node-cron";
import prisma from "./db/db";

// Probably not most efficient way to do this, but it works for a hackathon
let creds = {};

const { APNS_KEY_ID, APNS_TEAM_ID } = (creds = process.env);

if (!APNS_KEY_ID || !APNS_TEAM_ID)
  throw Error("APNS_KEY_ID or APNS_TEAM_ID not set " + creds);

const push = new PushNotifications({
  apn: {
    token: {
      key: "./certs/key.p8",
      keyId: process.env.APNS_KEY_ID,
      teamId: process.env.APNS_TEAM_ID,
    },
    production: process.env.NODE_ENV === "production",
  },
});

export const sendPushNotification = (cb: PushNotifications.Callback) => {
  push.send(
    "com.lancerjawns.trashapp",
    {
      title: "Trash Time‼",
      body: "Upload Your Trash Now!",
    },
    cb
  );
};


schedule("0 0 * * *", async (now) => {
  if (now instanceof Date) {
    console.log("Running cron job");

    // Get all users who have not uploaded a picture in the last 24 hours
    const users = await prisma.user.findMany({
      where: {
        weeklyPlants: {
            // this might be wrong, not too sure
          every: {
            updatedAt: {
              lt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    });
  }

  // WIP
});
