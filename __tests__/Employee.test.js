const Employee = require("../lib/employee");

test("Can get name of employee", () => {
    const testName = "Mo";
    const emp = new Employee(1, testName, "emp@emp.com");
    expect(emp.getName()).toEqual(testName);
});

test("Can get ID of employee", () => {
    const testID = 3;
    const emp = new Employee(testID, "Mo", "emp@emp.com");
    expect(emp.getID()).toEqual(testID);
});

test("Can get email of employee", () => {
    const testEmail = "emp@emp.com";
    const emp = new Employee(1, "Mo", testEmail);
    expect(emp.getEmail()).toEqual(testEmail);
});