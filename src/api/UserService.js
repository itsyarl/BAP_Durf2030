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
}

export default UserService;