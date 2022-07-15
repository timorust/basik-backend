"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const jsonBodyMiddleware = express_1.default.json();
app.use(jsonBodyMiddleware);
const port = 3000;
const db = {
    scills: [
        { id: 1, title: "front-end" },
        { id: 2, title: "backend" },
        { id: 3, title: "full-stack" },
        { id: 4, title: "devops" },
    ],
};
app.get("/scills", (req, res) => {
    let foundScills = db.scills;
    if (req.query.title) {
        foundScills = foundScills.filter(s => s.title.indexOf(req.query.title) > -1);
    }
    res.json(foundScills);
});
app.get("/scills/:id", (req, res) => {
    const foundScills = db.scills.find(s => s.id === +req.params.id);
    if (!foundScills) {
        res.sendStatus(404);
        return;
    }
    res.json(foundScills);
});
app.put("/scills/:id", (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const foundScills = db.scills.find(s => s.id === +req.params.id);
    if (!foundScills) {
        res.sendStatus(404);
        return;
    }
    foundScills.title = req.body.title;
    res.sendStatus(204);
});
app.delete("/scills/:id", (req, res) => {
    db.scills = db.scills.filter(s => s.id !== +req.params.id);
    res.sendStatus(204);
});
app.post('/scills', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(400);
        return;
    }
    const createScills = {
        id: +(new Date()),
        title: req.body.title
    };
    db.scills.push(createScills);
    console.log(createScills);
    res.status(201).json(createScills);
});
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
