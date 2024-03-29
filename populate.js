const faker = require('faker')
const axios = require('axios').default

const createPost = async (nbr) => {
  for (let i = 0; i < nbr; i++) {
    const body = {
      author: '5f09dc8138df624094b91c0f',
      content: '[GENERATED] ' + faker.hacker.phrase(),
      // repost: '5eea84f7c6662428f8eea726'
    }
    await axios.post('http://localhost:1337/posts', body)
  }
}

const comment = async (nbr) => {
  for (let i = 0; i < nbr; i++) {
    const body = {
      author: '2hCTAHiYapeqnJwAliIwwqLpqDj1',
      post: '5ea4ba3a1dc10949d06cd0a6',
      content: faker.hacker.phrase()
    }
    await axios.post('http://localhost:1337/comments', body)
  }
}

(async () => {
  await createPost(100)
  // await comment(30)
})()