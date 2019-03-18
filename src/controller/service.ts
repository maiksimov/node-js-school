import { BaseContext } from 'koa';
import { getManager, Repository, Not, Equal } from 'typeorm';
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as crypto from 'crypto';
import * as stream from 'stream';
import { Pipeline } from '../entity/pipeline';
import { validate, ValidationError } from 'class-validator';
import { UpperCase, LowerCase, RemoveSpaces } from '../stream/transformers';
import { response } from '../constants';

export default class ServiceController {

    public static async create(ctx: BaseContext) {
        const manager = getManager();
        const newPipeline: Pipeline = new Pipeline();
        newPipeline.steps = ctx.request.body.flowSteps;

        const errors: ValidationError[] = await validate(newPipeline);

        if (errors.length > 0) {
            ctx.status = response.BAD_REQUEST;
            ctx.body = errors;
            return;
        }

        const pipeline = await manager.save(newPipeline);
        ctx.status = response.CREATED;
        ctx.body = pipeline;
    }

    public static async execute(ctx: BaseContext) {
        const manager = getManager();
        const pipeline = await manager.findOne(Pipeline, { where: { id: +ctx.params.id || 0 }});

        if ( !pipeline ) {
            ctx.status = response.BAD_REQUEST;
            ctx.body = 'The pipeline you are trying to find doesn\'t exist in the db';
            return;
        }

        const filename = ctx.request.body.data.replace(/@/g, '');
        let newfile = 'new_' + filename;

        const input = await fs.createReadStream(filename);
        let temp;

        for ( const step of pipeline.steps ) {
            temp = temp === undefined ? input : temp;
            switch (step) {
                case 'upperCase':
                    temp = await temp.pipe(UpperCase);
                    break;
                case 'lowerCase':
                    temp = await temp.pipe(LowerCase);
                    break;
                case 'removeSpaces':
                    temp = await temp.pipe(RemoveSpaces);
                    break;
                case 'gzip':
                    temp = await temp.pipe(zlib.createGzip());
                    newfile += '.gz';
                    break;
                case 'ungzip':
                    temp = await temp.pipe(zlib.createUnzip());
                    newfile = newfile.replace(/\.gz/i, '');
                    break;
                case 'encrypt':
                    const cipher = crypto.createCipher('aes192', 'password');
                    temp = await temp.pipe(cipher);
                    newfile += '.enc';
                    break;
                case 'decrypt':
                    const decipher = crypto.createDecipher('aes192', 'password');
                    temp = await temp.pipe(decipher);
                    newfile = newfile.replace(/\.enc/i, '');
                    break;
                default:
                    break;
            }
        }

        temp.pipe(fs.createWriteStream(newfile)).on('finish', () => { console.log('Done'); });

        ctx.status = response.OK;
    }

  }
