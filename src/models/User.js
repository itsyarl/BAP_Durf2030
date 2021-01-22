import { v4 } from "uuid";

class User {
  constructor({ id = v4(),store, email, password, admin, name }) {
    this.id = id;
    this.admin = admin;
    this.name = name;
    this.email = email;
    this.password = password;
    this.projects = [];
  }

  linkProject(project) {
    !this.projects.includes(project) && this.projects.push(project);
    !project.participants.includes(this) && project.linkParticipant(this);
  }
}

// const userConverter = {
//   toFauna: function(user) {
//     return {
//       id: user.id,
//       admin: user.admin,
//       email: user.email,
//     };
//   },
//   fromFauna: function(snapshot, options) {
//     const data = snapshot.data(options);
//     return new User({
//       id: data.id,
//       admin: data.admin,
//       email: data.email,
//     });
//   }
// };

// export { userConverter };
export default User;
