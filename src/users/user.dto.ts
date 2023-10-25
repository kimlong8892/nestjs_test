import { Expose, Transform } from 'class-transformer';

export class UserDto {
    @Expose()
    id: number;
    first_name: string;
    last_name: string;
    @Transform(({ obj }) => obj.first_name + ' ' + obj.last_name)
    @Expose()
    full_name;
    @Expose()
    is_active: boolean;
}