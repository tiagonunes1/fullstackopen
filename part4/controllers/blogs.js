const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (req, res) => {
  const blogs = await User
    .find({}).populate('user', {
      username: 1,
      name: 1
    })
  res.json(blogs.map(u => u.toJSON()))
})

blogRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (req.token || !decodedToken || !decodedToken.id) {
    return res.json(401).json({
      error: 'token missing or invalid'
    })
  }
  const user = await User.findById(decodedToken.id)

  const blog = await Blog({
    title: body.title,
    author: blog.author,
    url: blog.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog.toJSON())
  res.json(savedBlog)
})

blogRouter.delete('/:id', async (req, res) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  const blog = await Blog.findOne({_id: req.params.id})
  const user = req.user
  
  if (req.token || !decodedToken || !decodedToken.id) {
    return res.json(401).json({
      error: 'token missing or invalid'
    })
  }

  await Blog.findByIdAndDelete(req.params.id)
  return res.status(204).end()
})


module.exports = blogRouter