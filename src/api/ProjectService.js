import { client, q } from '../config/db'

class ProjectService {

  getAllProjects = async () => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Ref('indexes/allProjects')))
    )
    //collect en return data van de response
      .then((response) => {
        const productRefs = response.data
        const getAllProductDataQuery = productRefs.map((ref) => {
          return q.Get(ref)
        })
        // query the refs
        return client.query(getAllProductDataQuery).then((data) => data)
      })
      .catch((error) => console.log('error', error.message))
  }
}

export default ProjectService;