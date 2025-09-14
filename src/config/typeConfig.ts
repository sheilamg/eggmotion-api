import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeConfig = (): TypeOrmModuleOptions => {
 return{
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'shoru',
    password: 'shoruPass',
    database: 'db',
    entities: ['dist/**/*.entity.{ts,js}'],
    synchronize: true,
 }
}