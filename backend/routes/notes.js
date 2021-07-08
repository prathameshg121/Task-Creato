const router = require("express").Router();
const Note = require("../models/note.model");
const checkAuth = require("../middlewares/check-auth");

router.post("/create", checkAuth, (req, res, next) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
    // date: Date.parse(req.body.reminder),
  });
  // console.log(note);
  note
    .save()
    .then((note) => {
      if (note) {
        res.status(201).json({
          message: "Note added successfully",
          note: {
            ...note,
            id: note._id,
          },
        });
      }

      if (!note) {
        res.status(404).json({
          message: "Error Adding Post",
        });
      }
    })
    .catch((e) => {
      console.log(e);
      res.status(501).json({ message: "Error Adding Post" + e });
    });
});

router.put("/:id", checkAuth, (req, res, next) => {
  // console.log("put method : "+req.body)
  const note = new Note({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId,
  });
  // console.log("Edited Note : ",note);
  Note.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    note
  ).then((result) => {
    if (result) {
      res.status(200).json({ message: "Update successful!" });
    } else {
      res.status(500).json({ message: "Error Upating note" });
    }
  });
});

router.get("/mynote", checkAuth, (req, res, next) => {
  // console.log("Reques"+req);
  Note.find({ creator: req.userData.userId })
    .then((note) => {
      if (note) {
        // console.log('Response note : '+note);
        res.status(200).json({
          message: "Notes fetched successfully!",
          notes: note,
        });
      } else {
        res.status(404).json({ message: "Note not found!" });
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Note.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
    (result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        return res.status(401).json({ message: "Not authorized!!" });
      }
    }
  );
});

module.exports = router;
