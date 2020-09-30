const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');


// Routes
router.get('/', (req, res) => {

    BlogPost.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newBlogPost = new BlogPost(data);

    newBlogPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // BlogPost
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

router.get("/posts/detail/:id", (req, res) => {
    let id = req.params.id;
  
    BlogPost.findById(id, function (err, post) {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, post });
    });
  });

router.put("/update/:id", (req, res) => {
    BlogPost.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      (err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        // return res.status(200).json({ success: true });
        return res.status(200).json({ success: true,data });
      }
    );   
  });

  router.put("/update/:id", (req, res) => {
    BlogPost.findByIdAndUpdate(req.params.id).exec((error, Item) => {
      if (error) {
        res.send(error);
      }
      return res.json(Item);
    });
  });

router.delete("/:id", (req, res) => {
    BlogPost.findByIdAndRemove(req.params.id).exec((error, deletedItem) => {
      if (error) {
        res.send(error);
      }
      return res.json(deletedItem);
    });
  });


module.exports = router;