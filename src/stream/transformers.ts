import { Transform } from 'stream';

const UpperCase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toUpperCase());
    }
});

const LowerCase = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().toLowerCase());
    }
});

const RemoveSpaces = new Transform({
    transform(chunk, encoding, callback) {
        callback(null, chunk.toString().replace(/\s+/g, ''));
    }
});

export { UpperCase, LowerCase, RemoveSpaces };