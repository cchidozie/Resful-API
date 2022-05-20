const express = require('express')
const router = express.Router()
const Post = require('../models/Post')

//Get the existing posts in the DB
router.get('/', async (req, res) => {
  try {
    const post = await Post.find()
    console.log(post)
    res.json(post)
  } catch (err) {}
})

//Add a new post to the DB
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  })
  console.log(post)

  try {
    const savedPost = await post.save()
    res.json(savedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

//find something specific
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
    console.log(post)
    res.json(post)
  } catch (err) {
    res.json({ message: err })
  }
})

//delete specific post
router.delete('/:postId', async (req, res) => {
  try {
    const removedPost = await Post.remove({ _id: req.params.postId })
    console.log(removedPost)
    res.json(removedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

//update a post
router.patch('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, description: req.body.description } }
    )
    console.log(updatedPost)
    res.json(updatedPost)
  } catch (err) {
    res.json({ message: err })
  }
})

module.exports = router
