const router = require("express").Router();
const Note = require("../models/encryptnote.model");
const checkAuth = require("../middlewares/check-auth");



// //Route to add a new post
// router.route("/create").post((req, res) => {
//     //Retrieve data for post
//     const { title, description, author } = req.body;
//     const date = Date.parse(req.body.date);

//     //Create a new Post and save it to DB
//     const newNote = new Note({
//         title,
//         description,
//         author,
//         date,
//     });

//     // Save the new post
//     newNote
//         .save()
//         .then(() => res.json("Note Added!"))
//         .catch((err) => res.status(400).json("Error: " + err));
// });

// //route to display a particular post
// // router.route("/:id").get((req, res) => {
// //     Post.findById(req.params.id)
// //         .then((post) => res.json(post))
// //         .catch((err) => res.status(400).json("Error: " + err));
// // });

// // Route to edit a particular post
// router.route("/edit/:id").post((req, res) => {
//     Note.findById(req.params.id)
//         .then((note) => {
//             note.title = req.body.title;
//             note.body = req.body.body;
//             note.author = req.body.author;
//             note.date = Date.parse(req.body.date);

//             note.save()
//                 .then(() => res.json("Note Edited"))
//                 .catch((err) => res.status(400).json("Error: " + err));
//         })
//         .catch((err) => res.status(400).json("Error: " + err));
// });

// // Route to Delete a route
// router.route("/:id").delete((req, res) => {
//     Note.findByIdAndDelete(req.params.id)
//         .then(() => res.json("Note Deleted"))
//         .catch((err) => res.status(400).json("Error: " + err));
// });



router.post("/create", checkAuth, (req, res, next) => {
        console.log("create note data"+req.body)
        // const url = req.protocol + "://" + req.get("host")
         console.log("Userid : "+ JSON.stringify(req.userData));
        const note = new Note({
            title: req.body.title,
            content: req.body.content,
            creator: req.userData.userId,
            // date: Date.parse(req.body.reminder),
        })
        console.log(note);
        note.save().
            then(note => {
                if(note){
                    res.status(201).json({
                        message: "Note added successfully",
                        note: {
                            ...note,
                            id: note._id
                        }
                    })
                }

                    if(!note){
                        res.status(404).json({
                            message: "Error Adding Post",
                          
                        });
                    }
               
                
            })
            .catch(e => {
                console.log(e);
                res.status(501).json({ message: "Error Adding Post"+e });
            })
    })


   
router.put("/:id", checkAuth, (req, res, next) => {
        
    console.log("put method : "+req.body)
        const note = new Note({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content,
            creator: req.userData.userId
        });
        console.log("Edited Note : ",note);
        Note.updateOne(
            { _id: req.params.id, creator: req.userData.userId },
            note
          ).then(result => {
            if(result){
                res.status(200).json({ message: "Update successful!" });
            }
            
            else {
                res.status(500).json({ message: "Error Upating note" });
            }
        });
    }
);



router.get("/mynote", 
checkAuth,
(req, res, next) => {
  console.log("Reques"+req);
    Note.find({creator: req.userData.userId}).then(note => {
      if (note) {
        console.log('Response note : '+note);
        res.status(200).json({
            message: "Notes fetched successfully!",
            notes: note
        });
      } else {
        res.status(404).json({ message: "Note not found!" });
      }
    })
    .catch(e=>{
        console.log(e)
    });
  });
  

// router.get("/:id", (req, res, next) => {
//     Post.findById(req.params.id).then(post => {
//       if (post) {
//         res.status(200).json(post);
//       } else {
//         res.status(404).json({ message: "Post not found!" });
//       }
//     });
//   });

  router.delete("/:id", checkAuth, (req, res, next) => {
    Note.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(
      result => {
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