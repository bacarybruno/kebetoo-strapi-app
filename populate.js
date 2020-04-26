const faker = require('faker')
const axios = require('axios').default

const populate = async (nbr) => {
  for (let i = 0; i < nbr; i++) {
    const body = {
      author: '2hCTAHiYapeqnJwAliIwwqLpqDj1',
      content: faker.hacker.phrase()
    }
    await axios.post('http://localhost:1337/posts', body)
  }
}

(async () => {
  await populate(1000)
})()