import { Router } from "express";

const router = Router();

router.post("/api/users/signout", (req, res) => {
  res.send("sign in");
});

export { router as signoutRouter };