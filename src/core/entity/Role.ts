import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    code: string;

    @Column()
    label: string;

    @CreateDateColumn({
        name: "created_time"
    })
    createTime: Date;

    @UpdateDateColumn({
        name: "updated_time"
    })
    updateTime: Date;
}