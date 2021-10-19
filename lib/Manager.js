const Employee = require("./Employee");

class Manager extends Employee {
    constructor (name, id, email, roomNum) {
        super(name, id, email),
        this.room = roomNum
    }
    getRole() {
        return "Manager";
    }
    getRoom () {
        return this.room;
    }
}

module.exports = Manager;