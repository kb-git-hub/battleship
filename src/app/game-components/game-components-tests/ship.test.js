import { shipConfig } from '../config/ship.config';
import { Ship } from '../ship.class';

describe('myShip', () => {
    let carrier;

    beforeAll(() => {
        carrier = new Ship({ ...shipConfig, length: 3, type: 'carrier', hitCount: 0 });
    });

    test('confirm ship object', () => {
        expect(carrier).toBeInstanceOf(Ship);
    });

    test('get ship properties', () => {
        expect(carrier).toHaveProperty('length', 3);
        expect(carrier).toHaveProperty('type', 'carrier');
    });

    test('ship hit: 1', () => {
        carrier.hit();
        expect(carrier).toHaveProperty('hitCount', 1);
    });

    test('ship hit: 2', () => {
        carrier.hit();

        expect(carrier).toHaveProperty('hitCount', 2);
    });

    test('ship isSunk: False', () => {
        expect(carrier.isSunk()).toBe(false);
    });

    test('ship hit: 3', () => {
        carrier.hit();
        expect(carrier).toHaveProperty('hitCount', 3);
    });

    test('ship isSunk: True', () => {
        expect(carrier.isSunk()).toBe(true);
    });
});
