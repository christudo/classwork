const users = [
    {email: "cdacruz@pratt.edu",
     name: "Christine", password: "password"}
  ];
  exports.add = (user) => {
    users.push(user);
  }
  exports.getByEmail = (email) => {
    return users.find((user) => user.email === email);
  }
  exports.login = (login) => {
    let user = exports.getByEmail(login.email);
    if (user && user.password === login.password) {
      return user;
    }
    return null;
  }
  exports.all = users  
  