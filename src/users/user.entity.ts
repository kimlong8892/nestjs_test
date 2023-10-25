import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        default: false,
    })
    is_active: boolean;

    @Column({
        type: 'enum',
        enum: ['admin', 'user'],
        default: 'admin',
    })
    role: string;
}