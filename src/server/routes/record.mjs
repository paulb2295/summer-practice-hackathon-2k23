import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();



router.get("/", async (req, res) => {
  let collection = await db.collection("mfa");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});


router.get("/:id", async (req, res) => {
  let collection = await db.collection("mfa");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// create mfa record
router.post("/", async (req, res) => {
  let newDocument = {
    name: req.body.name,
    code: req.body.code,
  };
  let collection = await db.collection("mfa");
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});





// delete name code
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("mfa");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
