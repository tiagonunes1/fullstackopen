const Blog = require('../models/blog')

const initialBlogs = [{
  title: 'Don Quixote.',
  author: 'Tiago Nunes',
  url: 'www.google.pt',
  likes: 420 
},
{
  title: 'Beloved',
  author: 'Harry Potter',
  url: 'www.yahoo.com',
  likes: 619 
}
]

const nonExistingId = async() => {
  const blog = new Blog({
    title:'willremovethissoon'
  })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async() => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
  nonExistingId
}