import { HttpException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateRequest } from "../dto/UserCreateRequest";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async findByUsername(username: string) {
        return await this.userRepository.findOneBy({
          username,
        });
      }
    async create(userCreateRequest: UserCreateRequest){
        const existedUser = await this.findByUsername(userCreateRequest.username);

        if(existedUser){
            throw new HttpException('用户名存在', 400);
        }
        console.log(existedUser);

        const user:User = new User();
        user.username = userCreateRequest.username;
        user.encryptedpassword = userCreateRequest.password;
        const salt = await bcrypt.genSalt(10)
        user.encryptedpassword = await bcrypt.hash(
            userCreateRequest.password,
            salt
        );
        return this.userRepository.save(user);
    }
}