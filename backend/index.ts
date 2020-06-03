import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import router from "./routes";
import handleErrors from "./middleware/handle-errors";
import { appConfig } from "./config/app-config";

const app = express();
const { port } = appConfig;

app.use(bodyParser.json());
app.use(cors());
app.use(compression());
app.use("/", router);
app.use(handleErrors);

app.listen(port, () => console.log(`listening on port ${port}...`));
