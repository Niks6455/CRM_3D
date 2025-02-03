
import jwt from "../utils/jwt.js";
import User from "../models/user.js";


export default {
  async login({ body: { email, password } }, res) {
    if (!email) throw new Error("email");
    if (!password) throw new Error("password");

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password)
      throw new Error("Login or password");
    const { jwt: token } = jwt.generate({ id: user.id, role: user.role });
    res.json({ user: user, token });
  },

  async registration({ body: { email, password, fio } }, res) {
    if (!email) throw new Error("email no found");
    if (!password) throw new Error("password no found");
    if (!fio) throw new Error("FIO no found");

    const user = await User.findOne({ where: { email } });
    if (user) throw new Error("user is created");

    const newUser = await User.create({ email, password, fio, role: 1 });
    const { jwt: token } = jwt.generate({ id: newUser.id, role: newUser.role }); // исправлено

    res.json({ user: newUser, token });
},


  async svitchRole(req, res) {
    const { id, role } = req.body;
    if (!id) throw new Error("id no found");
    if (!role) throw new Error("role no found");
    const user = await User.update({ role }, { where: { id } });
    res.json({ user });
  },

  async getUsers(req, res) {
    const users = await User.findAll();
    res.json(users);
  },
  
};
  