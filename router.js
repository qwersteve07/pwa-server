const Router = require("koa-router");
const router = new Router();
const subscription = require("./subscription");

router.post("/subscription", subscription.addSubscription);
router.get("/subscription/:id", subscription.pushNotification);

module.exports = router;
