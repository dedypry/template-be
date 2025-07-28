import { Service } from "typedi";

@Service()
export class HomeService {
  constructor() {}

  hello(){
    return "hello word"
  }
}