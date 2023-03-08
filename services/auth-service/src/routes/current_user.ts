import { Router } from "express";

const router = Router();

router.get("/api/users/current-user", (req, res) => {
  res.send("Current user");
});

export { router as currentUserRouter };
