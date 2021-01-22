import { client, q } from '../config/db';
import faunadb from 'faunadb';
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
            projects: []
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

  getUserByDocument = async (document) => {
    return await client.query(
      q.Get(q.Ref(q.Collection("Users"), `${document}`))
    )
    .then((response) => {    
      return response.data;
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