import { client, q } from '../config/db';

class RolService {

  giveRol = async (participant, rol, projectId) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('role_by_project_and_name'), [ projectId, rol.name ])
      )
    );
    const ref = object.ref.id;

    //document updaten
    await client.query(
      q.Update(
        q.Ref(q.Collection('Rollen'), ref),
        { data: { users: q.Append(participant, object.data.users), 
                  aantal: rol.aantal - 1
        } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  }

  updateRol = async (id, waarde, users) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('role_by_id'), id)
      )
    )

    const ref = object.ref.id;

    await client.query(
      q.Update(
        q.Ref(q.Collection('Rollen'), ref),
        { data: { 
            users: users,
            aantal: waarde
        } },
      )
    )
    .catch((err) => console.error('Error: %s', err))
  } 

  removeRol = async (id) => {
    const object = await client.query(
      q.Get(
        q.Match(q.Index('role_by_id'), id)
      )
    )

    const ref = object.ref.id;

    await client.query(
      q.Delete(q.Ref(q.Collection('Rollen'), ref))
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

}

export default RolService;