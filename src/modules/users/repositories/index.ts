
import { SequelizeUserRepo } from "./implementations/sequelizeUserRepo";
import models from "../../../shared/infrastructure/database/sequelize/models";

const userRepo = new SequelizeUserRepo(models);

export { userRepo }
