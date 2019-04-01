import { createConnection, getManager } from 'typeorm';
import { connect, Payload } from 'ts-nats';
import 'reflect-metadata';
import { Service } from '../src/entity/service';
import { ServiceContext } from '../service-with-state-strategy/ServiceContext';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import { config } from './config';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });
const connectionOptions = PostgressConnectionStringParser.parse(config.databaseUrl);
createConnection({
    type: 'postgres',
    host: connectionOptions.host,
    port: connectionOptions.port,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    synchronize: true,
    logging: false,
    entities: [
        'dist/entity/**/*.js',
        'src/entity/**/*.ts'
    ],
    extra: {
        ssl: config.dbsslconn, // if not development, will use SSL
    }
}).then(async connection => {

    await connect({
        servers: ['nats://localhost:4222'],
        payload: Payload.JSON
    }).then((nc) => {

        nc.subscribe('service.update', async (err, msg) => {
            if (err) {
                console.log('error', err);
                return;
            }

            const manager = getManager();
            const service = await manager.findOne(Service, { where: { id: msg.data.id || 0 }});
            if ( !service ) return;
            const serviceContext = new ServiceContext(service.status, msg.data.action);
            service.status = serviceContext.run();
            await manager.save(service);
        });

    }).catch((ex) => {
        console.log('NATS connection error: ', ex);
    });



    console.log(`Service running on port ${config.port}`);

}).catch(error => console.log('TypeORM connection error: ', error));
