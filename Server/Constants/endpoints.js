const endpoints = {
  users: {
    getAll: "/api/users",
    getOne: "/api/users/:id",
    delete: "/api/users/:id",
    update: "/api/users/:id",
    post: "/api/users",
    login : "/api/users/login"
  },
  projects : {
    getAll: "/api/projects",
    getOne: "/api/projects/:id",
    delete: "/api/projects/:id",
    update: "/api/projects/:id",
    post: "/api/projects",
  }
};
module.exports = endpoints;
