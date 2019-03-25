import { BaseContext } from 'koa';
import { getManager } from 'typeorm';
import { Pipeline } from '../entity/pipeline';
import { Service } from '../entity/service';
import { validate, ValidationError } from 'class-validator';
import { constants } from '../constants';
import { ServiceContext } from '../../service-with-state-strategy/ServiceContext';

export default class ServiceController {

    public static async create(ctx: BaseContext) {
        const manager = getManager();
        const newService: Service = new Service();
        newService.status = 'new';

        const errors: ValidationError[] = await validate(newService);

        if (errors.length > 0) {
            ctx.status = constants.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        const service = await manager.save(newService);
        ctx.status = constants.CREATED;
        ctx.body = service;
    }

    public static async status(ctx: BaseContext) {
        const manager = getManager();
        const service = await manager.findOne(Service, { where: { id: +ctx.params.id || 0 }});

        if ( !service ) {
            ctx.status = constants.BAD_REQUEST;
            ctx.body = 'The service you are trying to find doesn\'t exist in the db';
            return;
        }

        const serviceContext = new ServiceContext(service, ctx.request.body.state);
        service.status = serviceContext.run();
        await manager.save(service);
        ctx.status = constants.OK;
        ctx.body = service.status;
    }
}
