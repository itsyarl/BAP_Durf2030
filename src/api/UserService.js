import { client, q } from '../config/db'

class UserService {

  createUser = async (user) => { 
    return await client.query(
      q.Create(
        q.Collection("Users"),
        {
          credentials: { password: user.password },
          data: {
            email: user.email,
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
  }
}

export default UserService;