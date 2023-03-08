import express from "express";

import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { currentUserRouter } from "./routes/current_user";

const PORT = 4000;

const app = express();

// middleware
app.use(express.json()); // json parser

// route handlers (API endpoints)
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(currentUserRouter);

app.listen(PORT, () => {
  console.log(`(auth-service) Listening on port ${PORT}...`);
});
