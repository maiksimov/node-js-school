import { ServiceContext } from '../../service-with-state-strategy/ServiceContext';

test('Can move by service flow from new to processing', () => {
    const context = new ServiceContext('new', 'next');
    expect(context.run()).toBe('processing');
});

test('Cant cancel from deploy', () => {
    const context = new ServiceContext('deploy', 'close');
    expect(() => { context.run(); } ).toThrow(Error);
});

test('Can refund from deploy', () => {
    const context = new ServiceContext('deploy', 'refund');
    expect(context.run()).toBe('refund');
});