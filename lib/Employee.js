class Employee
{
	constructor(id, employeeName, email)
	{
		this.id = id;
		this.employeeName = employeeName;
		this.email = email;
	}
	
	getName()
	{
		return this.employeeName;
	}
	
	getID()
	{
		return this.id;
	}
	
	getEmail()
	{
		return this.email;
	}
	
	getRole()
	{
		return Employee;
	}
}

module.exports = Employee;