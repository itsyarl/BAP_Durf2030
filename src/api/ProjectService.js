import { client, q } from '../config/db'
import Project from '../models/Project';
import User from '../models/User';
import Rol from '../models/Rol';
import Funding from '../models/Funding';
import Comment from '../models/Comment';

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
          ownerName: project.ownerName,
          likes: 0,
          image: project.image,
          validated: false,
          likedUsers: [],
          status: project.status,
          geo: project.geo,
          coOwners: project.coOwners,
          spotlight: false
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  updateProject = async (project, id) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('project_by_id'), id)
      )
    );
    // referentie van document ophalen
    const ref = object.ref.id;
    //document updaten
    return await client.query(
      q.Update(
        q.Ref(q.Collection('Project'), ref),
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
          ownerName: project.ownerName,
          likes: 0,
          image: project.image,
          validated: true,
          likedUsers: [],
          status: project.status,
          geo: project.geo,
          coOwners: project.coOwners,
          spotlight: project.spotlight
        } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }

  addLike = async (id, userId) => {
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
        { data: { 
          likes: object.data.likes + 1,
          likedUsers: q.Append(userId, object.data.likedUsers)
         } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
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


  getValidatedProjects = async (state, onChange, filter, addParticipant) => {
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
          return projects.forEach(async (project, user) => {
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
              likes: project.data.likes,
              likedUsers: project.data.likedUsers,
              validated: project.data.validated,
              ownerId: project.data.ownerId,
              status: project.data.status,
              geo: project.data.geo,
              ownerName: project.data.ownerName,
              coOwners: project.data.coOwners,
              spotlight: project.data.spotlight
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
                avatar: participant.data.avatar,
                companyName: participant.data.companyName,
                name: participant.data.name
              });
              //user linken aan project
              participantObj.linkProject(projectObj);
              projectObj.linkParticipant(participantObj);

              addParticipant(participantObj);

              const rollen = await this.getRolesByIdAndUser(project.data.id, participantObj.name);
              //voor elk rol
              for (const rol of rollen) {
                const rolObj = new Rol({
                  id: rol.data.id,
                  projectId: rol.data.projectId,
                  users: rol.data.users,
                  name: rol.data.name,
                  aantal: rol.data.aantal
                });
                //rollen linken aan project
                participantObj.linkRol(rolObj);
                rolObj.linkParticipant(participantObj);
              }
            }

            const rollen = await this.getRolesById(project.data.id);
            //voor elk rol
            for (const rol of rollen) {
              const rolObj = new Rol({
                id: rol.data.id,
                projectId: rol.data.projectId,
                users: rol.data.users,
                name: rol.data.name,
                aantal: rol.data.aantal
              });
              //rollen linken aan project
              rolObj.linkProject(projectObj);
              projectObj.linkRol(rolObj);
            }

            const funding = await this.getFundingById(project.data.id);
            //voor elk funding
            for (const fund of funding) {
              const fundingObj = new Funding({
                id: fund.data.id,
                projectId: fund.data.projectId,
                users: fund.data.users,
                product: fund.data.product,
                aantal: fund.data.aantal,
              });
              //funding linken aan project
              fundingObj.linkProject(projectObj);
              projectObj.linkFunding(fundingObj);
            }

            const comments = await this.getCommentByProjectId(project.data.id);
            console.log(comments);
            //voor elk comment
            for (const comment of comments) {
              const commentObj = new Comment({
                id: comment.data.id,
                projectId: comment.data.projectId,
                content: comment.data.content,
                userId: comment.data.userId,
                userName: comment.data.userName,
                timestamp: comment.data.timestamp,
              });
              //update linken aan project
              if (commentObj.userId === projectObj.ownerId){
                projectObj.linkUpdate(commentObj);
                commentObj.linkProjectUpdate(projectObj);
              }else{
                projectObj.linkComment(commentObj);
                commentObj.linkProjectComment(projectObj);
              }
            }
            //functie zodat de projecten worden terugestuurd
            if(projectObj.status === "Funding"){
              filter(projectObj, "all", projectObj.status)
            }
            onChange(projectObj);
          })
        })
      })
      .catch((error) => console.log('error', error.message))
  }

  getCommentByProjectId = async (id) => {
    return await client.query(
        q.Paginate(
          q.Match(
            q.Index('comment_by_project'), id)),
    )
    .then(async (response) => {
      const productRefs = response.data
      const getAllProductDataQuery = productRefs.map((ref) => {
        return q.Get(ref)
      })
      
      return await client.query(getAllProductDataQuery).then((data) => data);
    })
    .catch((error) => console.log('error', error.message))
  }

  getFundingById = async (id) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Index('funding_by_projectId'), id)),
    )
    .then((response) => {
      const productRefs = response.data
      const getAllProductDataQuery = productRefs.map((ref) => {
        return q.Get(ref)
      })
      return client.query(getAllProductDataQuery).then((data) => data)
    })
    .catch((error) => console.log('error', error.message))
    }

    getRolesByIdAndUser = async (id, user) => {
      return await client.query(
        q.Paginate(
          q.Match(
            q.Index('role_by_projectId_and_name'), [id, user])),
      )
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

  getRolesById = async (id) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Index('roles_by_projectId'), id)),
    )
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

  addOwnerToProject = async (user, id) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('user_by_id'), user)
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