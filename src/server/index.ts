import express from "express";
import { makeSignUpController } from "../factories/makeSignUpController";
import { makeSignInController } from "../factories/makeSignInController";
import { routeAdapter } from "./adapters/routeAdapter";
import { makeListLeadsController } from "../factories/MakeListLeadsController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMiddleware";
import { makeAuthorizationMiddleware } from "../factories/makeAuthorizationMiddleware";
import { makeRefreshTokenController } from "../factories/makeRefreshTokenController";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));
app.post("/refresh-token", routeAdapter(makeRefreshTokenController()));

app.get(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.post(
  "/leads",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  (req, res) => {
    res.json({ created: true });
  }
);

app.listen(3001, () => {
  console.log("hello world");
});
