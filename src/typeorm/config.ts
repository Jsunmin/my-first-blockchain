import path from 'path';
import { ConnectionOptions } from 'typeorm';

export const typeormConfig: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'smj',
    password: 'qwer1234',
    database: 'blockchain',
    // option
    entities: ['src/entities/*'],
    migrations: ['src/migrations/**/*.ts'],
    cli: {
        entitiesDir: 'src/entities',
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
    }
}