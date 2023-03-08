import { Router } from "express";

const router = Router();

router.post("/api/users/signin", (req, res) => {
  res.send("sign in");
});

export { router as signinRouter };
