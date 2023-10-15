import Express from "express";
import UserRepositoryPrismaPg from "./src/external/prisma/UserRepositoryPrismaPg";
import UserController from "./src/adapters/UserController/UserController";
import UserService from "./src/core/user/service/UserService";

const app = Express();
app.use(Express.json());

const PORT = 3000;

const userRepository = new UserRepositoryPrismaPg();
const user = new UserService(userRepository);
new UserController(app, user);



app.listen(PORT, () => console.log(`app runnning on port ${PORT}`));