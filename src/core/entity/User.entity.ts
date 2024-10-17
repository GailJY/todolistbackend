import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        unique: true,
    })
    username:string;

    @Column({
        default: false
    })
    locked: boolean;

    @Column({
        default: true
    })
    enabled: boolean;

    @CreateDateColumn({
        name: "created_time"
    })
    createTime: Date;

    @UpdateDateColumn({
        name: "updated_time"
    })
    updateTime: Date;
}