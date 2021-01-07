import { client, q } from '../config/db'

const getProject = client.query(
  q.Get(
      q.Ref(q.Collection('Project'), '287051593052848647'))
)
  .then((response) => {
    const productRefs = response.data
    // create new query out of todo refs. 
    // https://docs.fauna.com/fauna/current/api/fql/
    // const getAllProductDataQuery = productRefs.map((ref) => {
    //   return q.Get(ref)
    // })
    // query the refs
    return client.query(productRefs).then((data) => data)
  })
  .catch((error) => console.log('error', error.message))

export default getProject;