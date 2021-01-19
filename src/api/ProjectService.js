import { client, q } from '../config/db'

class ProjectService {

  createProject = async (project) => {
    return await client.query(
      q.Create(
        q.Collection('Project'),
        { data: { 
          id: project.id,
          title: project.title,
          description: project.description,
          recap: project.recap,
          location: project.location,
          donationGoal: project.donationGoal,
          theme: project.theme,
          eventDate: project.eventDate,
          ownerId: project.ownerId,
          likes: 0
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  approveProject = async (id) => {
  
    //Volledig document ophalen door id
    const object = await client.query(
      q.Get(
        q.Match(q.Index('project_by_id'), id)
      )
    );
    // referentie van document ophalen
    const ref = object.ref.id;
    //document updaten
    await client.query(
      q.Update(
        q.Ref(q.Collection('Project'), ref),
        { data: { validated: true } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }


  getValidatedProjects = async (state) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Index('validated_projects'), state))
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

  createComment = async comment => {
    return await client.query(
      q.Create(
        q.Collection('Comments'),
        { data: { 
          id: comment.id,
          projectId: comment.projectId,
          content: comment.content,
          userId: comment.userId,
          timestamp: comment.timestamp,
          idea: false,
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }
}

export default ProjectService;