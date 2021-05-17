
import { CreateMember } from "./CreateMember";
import { userRepo } from "../../../../users/repositories";
import { memberRepo } from "../../../repositories";

const createMember = new CreateMember(
  userRepo, memberRepo
)

export { createMember };