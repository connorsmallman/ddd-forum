
import { BaseController } from "../../../../../shared/infrastructure/http/models/BaseController";
import { GetRecentPostsRequestDTO } from "./GetRecentPostsRequestDTO";
import { GetRecentPosts } from "./GetRecentPosts";
import { GetRecentPostsResponseDTO } from "./GetRecentPostsResponseDTO";
import { PostDetailsMap } from "../../../mappers/postDetailsMap";
import { DecodedExpressRequest } from "../../../../users/infrastructure/http/models/decodedRequest";
import * as express from 'express'

export class GetRecentPostsController extends BaseController {
  private useCase: GetRecentPosts;

  constructor (useCase: GetRecentPosts) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: any): Promise<any> {

    const dto: GetRecentPostsRequestDTO = {
      offset: req.query.offset,
      userId: !!req.decoded === true ? req.decoded.userId : null
    }
    

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          default:
            return this.fail(res, error.errorValue().message);
        }
        
      } else {
        const postDetails = result.value.getValue();
        return this.ok<GetRecentPostsResponseDTO>(res, {
          posts: postDetails.map((d) => PostDetailsMap.toDTO(d))
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}