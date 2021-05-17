
import { GetUserByUserName } from "./GetUserByUserName";
import { GetUserByUserNameController } from "./GetUserByUserNameController";
import { userRepo } from "../../repositories";

const getUserByUserName = new GetUserByUserName(
  userRepo
)

const getUserByUserNameController = new GetUserByUserNameController(
  getUserByUserName
)

export { 
  getUserByUserName,
  getUserByUserNameController
}