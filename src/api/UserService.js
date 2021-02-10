import { client, q } from '../config/db';
import faunadb from 'faunadb';
import User from '../models/User';
import Rol from '../models/Rol';
class UserService {

  createUser = async (user) => { 
    return await client.query(
      q.Create(
        q.Collection("Users"),
        {
          credentials: { password: user.password },
          data: {
            id: user.id,
            admin: user.admin,
            name: user.name,
            email: user.email,
            projects: [],
            avatar: user.avatar,
            companyName: user.companyName
          },
        }
      )
    )
  }

  login = async (user) => {
    return await client.query(
      q.Login(
        q.Match(q.Index("users_by_email"), user.email),
        { password: user.password },
      )
    )
    .then((response) => {    
      return response;
    })
    .catch((error) => console.log('error', error.message))
  }

  getUserByEmail = async (email) => {
    return await client.query(
      q.Paginate(q.Match(q.Index('users_by_email'), email))
    )
    .catch((error) => console.log('error', error.message))
  }

  getUserByDocument = async (document, onChange) => {
    await client.query(
      q.Get(q.Ref(q.Collection("Users"), `${document}`))
    )
    .then(async (response) => {
      await client.query(response).then( async (user) => {
          //project als model invoegen
          const userObj = new User({
            id: user.data.id,
            admin: user.data.admin,
            name: user.data.name,
            email: user.data.email,
            projects: user.data.projects,
            avatar: user.data.avatar,
            companyName: user.data.companyName
          });

          const rollen = await this.getRolesByIdAndUser(userObj.name);
          //voor elk rol
          for (const rol of rollen) {
            const rolObj = new Rol({
              id: rol.data.id,
              projectId: rol.data.projectId,
              users: rol.data.users,
              name: rol.data.name,
              aantal: rol.data.aantal
            });
            //rollen linken aan user
            userObj.linkRol(rolObj);
            rolObj.linkParticipant(userObj);
          }
          onChange(userObj);
        })
    })
    .catch((error) => console.log('error', error.message))
  }

  getRolesByIdAndUser = async (user) => {
    return await client.query(
      q.Paginate(
        q.Match(
          q.Index('get_roles_by_user'),  user)),
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

  checkLoggedIn = async (userKey) => {
    const token = new faunadb.Client({ secret: userKey })
    return await token.query(
      q.HasCurrentToken()
    )
    .catch((err) => console.error('Error: %s', err))
  }

  logout = async (userKey) => {
    // const token = new faunadb.Client({ secret: userKey })
    return await client.query(
      q.Logout(true)
    )
  }
}

export default UserService;