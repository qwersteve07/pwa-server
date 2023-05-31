const webPush = require("web-push");
const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
webPush.setVapidDetails(
  "mailto:qwersteve07@gmail.com",
  publicVapidKey,
  privateVapidKey
);

router.post("/subscribe", async (ctx) => {
  const subscription = ctx.req.body;
  ctx.res.status(201).json({});

  const payload = JSON.stringify({
    title: "test notification title",
  });

  webPush.sendNotification(subscription, payload).catch((err) => {
    console.log(err);
  });
});

app.use(async (ctx) => {
  ctx.body = "hello world";
});

app.listen(3003);
