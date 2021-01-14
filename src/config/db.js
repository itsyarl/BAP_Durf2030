import faunadb from 'faunadb'

const client = new faunadb.Client({ secret: process.env.REACT_APP_FAUNADB_KEY })
const q = faunadb.query

// const userClient = new faunadb.Client({secret: process.env.FAUNA_GUEST_SECRET})

export { client, q }