import Express from "express";

const router = Express.Router();

router.route("/user").get((req, res, next) => {
  res.send("hello");
});

export default router;
