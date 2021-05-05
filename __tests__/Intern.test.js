const Intern = require("../lib/Intern");

test("Gets school of intern", () => {
  const testSchool = "Full Sail";
  const int = new Intern(1, "Mo", "int@int.com", testSchool);
  expect(int.getSchool()).toEqual(testSchool);
});