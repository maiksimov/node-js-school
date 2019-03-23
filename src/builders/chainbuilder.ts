import { Readable } from 'stream';
import { UpperCase, LowerCase, RemoveSpaces } from '../stream/transformers';
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as crypto from 'crypto';

export class ChainBuilder {

    private _stream;
    private _pipeline;
    private _chain;
    private _filename;

    constructor(stream: Readable, filename, pipeline) {
        this._stream = stream;
        this._pipeline = pipeline;
        this._filename = filename;
    }

    public async build() {
        const _this = this;
        this._chain = this._pipeline.steps.reduce(function(chain, step) {
            return _this[step](chain);
        }, this._stream);
        this._chain.pipe(fs.createWriteStream(this._filename)).on('finish', () => { console.log('Done'); });
        return { filename: this._filename, file: this._chain};
    }

    public upperCase(chain) {
        return chain.pipe(UpperCase);
    }

    public lowerCase(chain) {
        return chain.pipe(LowerCase);
    }

    public removeSpaces(chain) {
        return chain.pipe(RemoveSpaces);
    }

    public gzip(chain) {
        this._filename += '.gz';
        return chain.pipe(zlib.createGzip());
    }

    public ungzip(chain) {
        this._filename = this._filename.replace(/\.gz/i, '');
        return chain.pipe(zlib.createUnzip());
    }

    public encrypt(chain) {
        const cipher = crypto.createCipher('aes192', 'password');
        this._filename += '.enc';
        return chain.pipe(cipher);
    }

    public decrypt(chain) {
        const decipher = crypto.createDecipher('aes192', 'password');
        this._filename = this._filename.replace(/\.enc/i, '');
        return chain.pipe(decipher);
    }
}