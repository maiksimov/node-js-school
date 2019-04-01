import { BaseContext } from 'koa';
import { getManager } from 'typeorm';
import { Service } from '../entity/service';
import { validate, ValidationError } from 'class-validator';
import { constants } from '../constants';
import { ServiceContext } from '../../service-with-state-strategy/ServiceContext';
import { STATUS_NEW } from '../../service-with-state-strategy/status-constants';

export default class ServiceController {

    public static async create(ctx: BaseContext) {
        const manager = getManager();
        const newService: Service = new Service();
        newService.status = STATUS_NEW;

        const errors: ValidationError[] = await validate(newService);

        if (errors.length > 0) {
            ctx.status = constants.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        const service = await manager.save(newService);
        ctx.status = constants.CREATED;
        ctx.body = service.status;
    }

    public static async changeStatus(ctx: BaseContext) {
        const manager = getManager();
        const service = await manager.findOne(Service, { where: { id: +ctx.params.id || 0 }});

        if ( !service ) {
            ctx.status = constants.BAD_REQUEST;
            ctx.body = 'The service you are trying to find doesn\'t exist in the db';
            return;
        }

        const serviceContext = new ServiceContext(service.status, ctx.request.body.state);
        service.status = serviceContext.run();
        await manager.save(service);

        ctx.body = service.status;
        ctx.status = constants.OK;
    }
}
