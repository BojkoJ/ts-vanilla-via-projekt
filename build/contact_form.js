// Define the schema
const contactFormSchema = Zod.object({
	firstname: Zod.string().min(1, "Firstname is required"),
	lastname: Zod.string().min(1, "Lastname is required"),
	email: Zod.string().email("Invalid email address"),
	message: Zod.string().min(6, "Message too short. Minimum 6 characters."),
});

// Function to validate form data
function validateContactForm(data) {
	try {
		contactFormSchema.parse(data);
		return { success: true, errors: null };
	} catch (e) {
		return { success: false, errors: e.errors };
	}
}

document
	.getElementById("contactForm")
	.addEventListener("submit", function (event) {
		event.preventDefault();

		console.log(event.target.firstname);

		const formData = {
			firstname: event.target.firstname.value,
			lastname: event.target.lastname.value,
			email: event.target.email.value,
			message: event.target.message.value,
		};

		console.log(formData);

		const validationResult = validateContactForm(formData);

		const messageElement = document.getElementById("formMessage");
		if (!validationResult.success) {
			messageElement.textContent = validationResult.errors
				.map((error) => error.message)
				.join(", ");
			messageElement.style.color = "red";
		} else {
			messageElement.textContent = "Form submitted successfully!";
			messageElement.style.color = "green";
		}
	});
