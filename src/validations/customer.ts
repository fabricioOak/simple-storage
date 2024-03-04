export function validateCustomer(customer: Customer) {
	if (!customer.name) {
		return new Error("Customer name is required.");
	}

	if (!customer.email) {
		return new Error("Customer email is required.");
	}

	if (!customer.contact) {
		return new Error("Customer contact is required.");
	}

	return true;
}
