const ROUTES = {
  home: "/",
  login: "/login",
  register: "/register",
  projectDetail: { path: "/projectDetails/:id", to: "/projectDetails/" },
  acountUser: { path: "/acountUser/:id", to: "/acountUser/" },
  dataProject: { path: "/dataProject/:id", to: "/dataProject/" },
  editProject: { path: "/editProject/:id", to: "/editProject/" },
  funding: { path: "/funding/:id", to: "/funding/" },
  addProject: "/addProject",
  admin: "/admin",
  acount: "/acount",
  guide: "/guide",
  contact: "/contact",
  chat: "/chat",
  messages: { path: "/chat/:id", to: "/chat/" }
};

export { ROUTES };
