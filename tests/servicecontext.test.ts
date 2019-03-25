import { ServiceContext } from '../service-with-state-strategy/ServiceContext';

test('Can move by service flow from new to processing', () => {
    const context = new ServiceContext({id: 1, status: 'new'}, 'next');
    expect(context.run()).toBe('processing');
});

test('Cant cancel from deploy', () => {
    const context = new ServiceContext({id: 1, status: 'deploy'}, 'cancel');
    expect(context.run()).toBe(undefined);
});