import { BaseContext } from 'koa';
import { getManager } from 'typeorm';
import { Pipeline } from '../entity/pipeline';
import { validate, ValidationError } from 'class-validator';
import { constants } from '../constants';
import { ChainBuilder } from '../builders/chainbuilder';

export default class ServiceController {

    public static async create(ctx: BaseContext) {
        const manager = getManager();
        const newPipeline: Pipeline = new Pipeline();
        newPipeline.steps = ctx.request.body.flowSteps;

        const errors: ValidationError[] = await validate(newPipeline);

        if (errors.length > 0) {
            ctx.status = constants.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        const pipeline = await manager.save(newPipeline);
        ctx.status = constants.CREATED;
        ctx.body = pipeline;
    }

    public static async execute(ctx: BaseContext) {
        const manager = getManager();
        const pipeline = await manager.findOne(Pipeline, { where: { id: +ctx.params.id || 0 }});

        if ( !pipeline ) {
            ctx.status = constants.BAD_REQUEST;
            ctx.body = 'The pipeline you are trying to find doesn\'t exist in the db';
            return;
        }

        const builder = new ChainBuilder(ctx.req, ctx.request.headers.filename, pipeline);
        const file = await builder.build();
        ctx.set( 'Content-Type', 'application/force-download' );
        ctx.set( 'Content-disposition', 'attachment; filename=' + file.filename );
        ctx.status = constants.OK;
        ctx.body = file.file;
    }
}
