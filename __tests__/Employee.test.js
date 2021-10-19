const Employee = require('../lib/Employee');

test('Can instantiate employee instance', () => {
    const e = new Employee('name', 'email', 'id');
    expect(e).toEqual(expect.any(Object));
});