import express from "express";
import { Person } from "./objects/personTypes";
import { Grade } from "./objects/gradeTypes";
import { Tracker } from "./objects/trackerTypes";

const app = express();

let person: Person[] = [];

app.get("/person", (req, res, next) => {
  return res.json(person);
});

app.post("/person", (req, res) => {
  const newPerson = req.body as Person;
  person.push(newPerson);
  return res.json({
    msg: "name has been added",
  });
});

app.put("/person/:id", (req, res) => {
  const updatedname = req.body as Person;
  const { id } = req.params;

  const updatednameslist = person.filter((elm) => {
    return elm.id === id;
  });

  updatednameslist.push(updatedname);

  person = updatednameslist;

  return res.json({
    msg: "names updated !",
  });
});

app.delete("/person/:id", (req, res) => {
  const { id } = req.params;
  const delname = person.filter((elm) => {
    elm.id !== id;
  });
  person = delname;
  return res.json({
    msg: "name has been deleted ",
  });
});

//--------------------------------------------------------

let grade: Grade[] = [];

app.get("/grade", (req, res, next) => {
  return res.json(grade);
});

app.post("/grade", (req, res) => {
  const newgrade = req.body as Grade;
  grade.push(newgrade);
  return res.json({
    grade: "grade has been added",
  });
});

app.put("/grade/:id", (req, res) => {
  const updategrade = req.body as Grade;
  const { id } = req.params;

  const updategradelist = grade.filter((elm) => {
    return elm.id === id;
  });

  updategradelist.push(updategrade);

  grade = updategradelist;

  return res.json({
    msg: "grades updated !",
  });
});

app.delete("/grade/:id", (req, res) => {
  const { id } = req.params;
  const delgrade = grade.filter((elm) => {
    elm.id !== id;
  });
  grade = delgrade;
  return res.json({
    msg: "grade has been deleted ",
  });
});

//----------------------------------------------------

let track: Tracker[] = [];

app.use(express.json());

app.get("/tracker", (req, res) => {
  return res.json(track);
});

app.post("/tracker", (req, res) => {
  const newTrack = req.body as Tracker;

  track.push(newTrack);
  return res.json({
    msg: "track has been added !",
  });
});

app.put("/tracker/:id", (req, res) => {
  const updatedTracker = req.body as Tracker;
  const { id } = req.params;

  const updatedtrackerlist = track.filter((elm) => {
    return elm.id !== id;
  });

  updatedtrackerlist.push(updatedTracker);

  track = updatedtrackerlist;

  return res.json({
    msg: "tracks updated !",
  });
});

app.delete("/tracker/:id", (req, res) => {
  const { id } = req.params;

  const newTreacks = track.filter((elm) => {
    return elm.id !== id;
  });

  track = newTreacks;

  return res.json({
    msg: "tracks deleted !",
  });
});

app.get("/tracker/:title", (req, res) => {
  let key = req.params.title;
  let title = key.replace("-", " ");
  let searchVal = track.filter((elm) => {
    return elm.title.toLowerCase() || elm.title.toUpperCase() === title;
  });
  return res.json(searchVal);
});

app.listen(3000, () => {
  console.log("Server is running in port " + 3000);
});
