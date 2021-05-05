const Manager = require("../lib/Manager");

test("Can get office number", () => {
  const testOffice = 3;
  const mgr = new Manager(3, "Mo", "mgr@mgr.com", testOffice);
  expect(mgr.getOfficeNumber()).toEqual(testOffice);
});