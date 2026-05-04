const profile = require("./routes/profile");
console.log(
  profile.stack.map((m) => ({
    path: m.route && m.route.path,
    methods: m.route && m.route.methods,
  })),
);
