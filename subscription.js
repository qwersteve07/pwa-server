const webPush = require("web-push");
const crypto = require("crypto-js");
require("dotenv").config();

const subscriptionsGroup = {};

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  "mailto:qwersteve07@gmail.com",
  publicVapidKey,
  privateVapidKey
);

const addSubscription = (ctx) => {
  const createHash = (input) => {
    const hash = crypto.HmacSHA256(input, "secret");
    return hash.toString();
  };

  const subscription = ctx.request.body;
  const subscriptionId = createHash(JSON.stringify(subscription));
  subscriptionsGroup[subscriptionId] = subscription;

  ctx.status = 201;
  ctx.body = JSON.stringify({ id: subscriptionId });
};

const pushNotification = (ctx) => {
  const subscriptionId = ctx.params.id;
  const pushSubscription = subscriptionsGroup[subscriptionId];

  const payload = JSON.stringify({
    title: "PWA notification",
    text: "Take this!",
    tag: "testing",
    url: "https://i.imgur.com/Wjf3CFh.jpeg",
  });

  webPush.sendNotification(pushSubscription, payload).catch((err) => {
    console.error("err", err);
  });

  ctx.status = 202;
  ctx.body = JSON.stringify({});
};

module.exports = {
  addSubscription,
  pushNotification,
};
