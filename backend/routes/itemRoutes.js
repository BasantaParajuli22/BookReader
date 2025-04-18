import express from "express"
import {  deleteItem, getItem, getItems } from "../controller/ItemController.js";

const routes = express.Router();

routes.get('/novels',getItems);
routes.get('/novels/:id',getItem);

routes.delete('/novels/delete/:id',deleteItem);

export default routes;