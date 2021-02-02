import { client, q } from '../config/db';
import Rol from '../models/Rol';

class RolService {

  giveRol = async (participant, rol, projectId) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('role_by_project_and_name'), [ projectId, rol ])
      )
    );
    const ref = object.ref.id;

    //document updaten
    await client.query(
      q.Update(
        q.Ref(q.Collection('Rollen'), ref),
        { data: { users: q.Append(participant, object.data.users) } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }

  removeRol = async (participant, rol, projectId) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('role_by_project_and_name'), [ projectId, rol ])
      )
    );
    const ref = object.ref.id;

    await client.query(
      q.Update(
        q.Ref(q.Collection('Rollen'), ref),
        { data: { users: participant } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }

  createRol = async rol => {
    return await client.query(
      q.Create(
        q.Collection('Rollen'),
        { data: { 
          id: rol.id,
          projectId: rol.projectId,
          users: rol.users,
          name: rol.name,
          aantal: rol.aantal
        } },
      )
    )
    .then((response) => {
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  getRolesById = async (id, onChange) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Ref('indexes/roles_by_id'), id)),
    )
    .then(async (response) => {
      const productRefs = response.data
      const getAllProductDataQuery = productRefs.map((ref) => {
        return q.Get(ref)
      })
      
      await client.query(getAllProductDataQuery).then((roles) => {
        roles.forEach(async role => {
          //rol als model invoegen
          const roleObj = new Rol({
            id: role.data.id,
            projectId: role.data.projectId,
            users: role.data.users,
            name: role.data.name,
            aantal: role.data.aantal,
          });
          onChange(roleObj);
        })
      });
    })
    .catch((error) => console.log('error', error.message))
    }
}

export default RolService;