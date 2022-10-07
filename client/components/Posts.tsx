import React from 'react'
import posts from '../data/postData'

export default function Posts() {
  return (
    <div>
        {
            posts.map((post) => (
                <h1>{post.Name}</h1>
            ))
        }
    </div>
  )
}
