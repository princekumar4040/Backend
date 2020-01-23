var express = require('express');
var router = express.Router()
const Post = require('../models/post');

router.get('/users', ((req, res)=> {
    console.log(Post)
    var pageNo = parseInt(req.query.pageNo)
    var size = parseInt(req.query.size)
   
    if(pageNo < 0 || pageNo === 0) {
          response = {"error" : true,"message" : "invalid page number, should start with 1"};
          return res.json(response)
    }
    const postQuery = Post.find();
    if(pageNo>0 && size) {
        postQuery.skip(size * (pageNo - 1))
    }
    // query.skip = size * (pageNo - 1)
    // query.limit = size
    postQuery.then(documents => {
            res.status(200).json({
                message: 'Data Fetched Successfully',
                users: documents
            });
        }).catch(err => {
            res.status(500).json({
                message: 'something went wrong'+err,
            });
        });
}))

router.get('/users/details/:id', ((req, res)=> {
    console.log(Post)
    Post.find({_id: req.params.id}).then((documents) => {
        console.log(documents)
        res.status(200).json({
            message: 'Data Fetched Successfully',
            users: documents
        });
    })
}))

router.post('/users/add', ((req, res) => {
    console.log(req.body);
    const post = new Post({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    })
   post.save().then(documents => {
       if(documents) {
            res.status(200).json({
                message: 'Data saved successfully',
                post: post
            })
       }
   }).catch(err => {
        res.status(500).json({
            statusCode: 500,
            message: 'something went wrong'+err,
        });
    })
}))

router.delete("/users/delete/:id", (req, res, next) => {
    Post.deleteOne({_id: req.params.id}).then((result => {
        res.status(200).json({
            message: 'User Deleted Successfully'
        })
    }))
})

router.put('/users/edit/:id', ((req, res) => {
    console.log(req.body);
    let post = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }
    Post.findByIdAndUpdate({_id: req.params.id},post).then((result => {
         //const post = req.body;
        res.status(200).json({
            message: 'User updated successfully',
            post: result
        });
    }))
   
}))

module.exports = router;