import express from "express";
import cors from 'cors';
import route from './Routes';

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(route);
server.listen(8000);