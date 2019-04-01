import { Transform } from 'stream';

const UpperCase = new Transform({
    transform(chunk) {
        return chunk.toString().toUpperCase();
    }
});

const LowerCase = new Transform({
    transform(chunk) {
        return chunk.toString().toLowerCase();
    }
});

const RemoveSpaces = new Transform({
    transform(chunk, encoding, callback) {
        return chunk.toString().replace(/\s+/g, '');
    }
});

export { UpperCase, LowerCase, RemoveSpaces };