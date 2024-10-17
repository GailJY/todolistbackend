import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}


    async create(){
        const user: User = new User();
        user.username = "gg2";
        
        const save = await this.userRepository.save(user);
        console.log(save)
    }
}