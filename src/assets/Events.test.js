import { Events } from './Events';

describe('Events', () => {
  const eventHandler = new Events();
  const mockFunc1 = jest.fn((x) => x + 1);
  const mockFunc2 = jest.fn((x) => x + 1);

  test('correctly instantiates with new object', () => {
    expect(eventHandler.events).toEqual({});
  });

  test('adds new event listener if none present', () => {
    expect(eventHandler.events).toEqual({});
    eventHandler.on('newEvent', mockFunc1);
    expect(eventHandler.events).toEqual({ newEvent: [mockFunc1] });
  });

  test('delete event listener if present', () => {
    eventHandler.off('newEvent', mockFunc1);
    expect(eventHandler.events).toEqual({ newEvent: [] });
  });

  test('emit data from each subscribed function', () => {
    eventHandler.on('newEvent', mockFunc1);
    eventHandler.on('newEvent', mockFunc2);
    eventHandler.emit('newEvent', 1);

    expect(mockFunc1).toHaveBeenCalledWith(1);
    expect(mockFunc2).toHaveBeenCalledWith(1);
  });
});
