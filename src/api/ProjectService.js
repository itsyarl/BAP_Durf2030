import { client, q } from '../config/db'
import Project from '../models/Project';
import User from '../models/User';

class ProjectService {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

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
          likes: 0,
          image: project.image,
          validated: false
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


  getValidatedProjects = async (state, onChange) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Index('validated_projects'), state))
    )
    //collect en return data van de response
      .then(async (response) => {
        const projectsRefs = response.data
        const getAllProductDataQuery = projectsRefs.map((ref) => {
          return q.Get(ref)
        })

        await client.query(getAllProductDataQuery).then((projects) => {
          const result = projects.forEach(async project => {
            //project als model invoegen
            const projectObj = new Project({
              id: project.data.id,
              title: project.data.title,
              description: project.data.description,
              store: project.data.store,
              theme: project.data.theme,
              eventDate: project.data.eventDate,
              donationGoal: project.data.donationGoal,
              location: project.data.location,
              image: project.data.image,
            });
            //user ophalen van fauna
            const participants = await this.getParticipantsOfProject(project.data.id);

            //voor elke user 
            for (const participant of participants) {
              //een object maken
              const participantObj = new User({
                id: participant.data.id,
                admin: participant.data.admin,
                email: participant.data.email,
              });
              //user linken aan project
              participantObj.linkProject(projectObj);
              projectObj.linkParticipant(participantObj);
            }
            //functie zodat de projecten worden terugestuurd
            onChange(projectObj);
          })
          return result;
        })
      })
      .catch((error) => console.log('error', error.message))
  }

  getParticipantsOfProject = async (projectId) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Index('users_in_project'), projectId))
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

  addParticpantToProject = async (user, id) => {
      const object = await client.query(
        q.Get(
          q.Match(q.Index('users_by_email'), user.email)
        )
      );
      const ref = object.ref.id;
      //document updaten
      await client.query(
        q.Update(
          q.Ref(q.Collection('Users'), ref),
          { data: { projects: q.Append(id, object.data.projects) } },
        )
      )
      .catch((err) => console.error('Error: %s', err))
  }
}

export default ProjectService;