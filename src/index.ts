import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectToMongo } from "./connections/storage.connections";

dotenv.config();

const app = express();
connectToMongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
