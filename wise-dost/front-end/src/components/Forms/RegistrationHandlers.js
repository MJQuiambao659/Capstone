import axios from "axios";

export const handleCreateAccount = async (formState, setErrors) => {
  setErrors({});

  const isValidEmail = (email) => {
    // You can implement your own email validation logic here
    // This is a basic example, but you can use regular expressions or any other method.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    if (password.length <= 6) {
      return false;
    }

    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);

    return hasCapitalLetter && hasSmallLetter;
  };

  const errors = {};

  if (!formState.firstName.trim()) {
    errors.firstName = "First name is required.";
  }

  if (!formState.lastName.trim()) {
    errors.lastName = "Last name is required.";
  }

  // Email validation
  if (!formState.email.trim()) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(formState.email)) {
    errors.email = "Invalid email format.";
  } else {
    try {
      // Check if the email already exists
      const email = { email: formState.email}
      const response = await axios.post(
        `http://localhost:3001/api/check-email/email-validation`,
        email
      );
      if (response.data.exists) {
        errors.email = "Email is already registered.";                                                                                                              
      }
      console.log(response.data.exists);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  }

  // Password validation
  if (!formState.password.trim()) {
    errors.password = "Password is Required";
  } else if (!isValidPassword(formState.password)) {
    errors.password =
      "Password must be more than 6 characters and contain both capital and small letters";
  }

  // Porgram validation
  if (!formState.program) {
    errors.program = "Please select a program.";
  }

  // School validation
  if (!formState.school) {
    errors.school = "Please select a school.";
  }

  // Course validation
  if (!formState.course) {
    errors.course = "Please select a course.";
  }

  // If there are any errors, set them using the setErrors function
  if (Object.keys(errors).length > 0) {
    setErrors(errors);
    return;
  }
};
