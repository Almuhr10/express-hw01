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

  const updatednameslist = person.filter((persons) => {
    return persons.id === id;
  });

  updatednameslist.push(updatedname);

  person = updatednameslist;

  return res.json({
    message: "names updated !",
  });
});

app.delete("/person/:id", (req, res) => {
  const { id } = req.params;
  const delname = person.filter((person) => {
    person.id !== id;
  });
  person = delname;
  return res.json({
    message: "name deleted ",
  });
});

//--------------------------------------------------------

let grade1: Grade[] = [];

app.get("/grade", (req, res, next) => {
  return res.json(grade1);
});

app.post("/grade", (req, res) => {
  const newgrade = req.body as Grade;
  grade1.push(newgrade);
  return res.json({
    grade: "grade added",
  });
});

app.put("/grade/:id", (req, res) => {
  const updategrade = req.body as Grade;
  const { id } = req.params;

  const updategradelist = grade1.filter((grades) => {
    return grades.id === id;
  });

  updategradelist.push(updategrade);

  grade1 = updategradelist;

  return res.json({
    message: "grades updated !",
  });
});

app.delete("/grade/:id", (req, res) => {
  const { id } = req.params;
  const delgrade = grade1.filter((grades) => {
    grades.id !== id;
  });
  grade1 = delgrade;
  return res.json({
    message: "grade deleted ",
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
    message: "track added !",
  });
});

app.put("/tracker/:id", (req, res) => {
  const updatedTracker = req.body as Tracker;
  const { id } = req.params;

  const updatedtrackerlist = track.filter((tracks) => {
    return tracks.id !== id;
  });

  updatedtrackerlist.push(updatedTracker);

  track = updatedtrackerlist;

  return res.json({
    message: "tracks updated !",
  });
});

app.delete("/tracker/:id", (req, res) => {
  const { id } = req.params;

  const newTreacks = track.filter((tracks) => {
    return tracks.id !== id;
  });

  track = newTreacks;

  return res.json({
    message: "tracks deleted !",
  });
});

app.get("/tracker/:title", (req, res) => {
  let key = req.params.title;
  let title = key.replace("-", " ");
  let searchVal = track.filter((tracksa) => {
    return tracksa.title.toLowerCase() === title;
  });
  return res.json(searchVal);
});

app.listen(3000, () => {
  console.log("Server is running in port " + 3000);
});
