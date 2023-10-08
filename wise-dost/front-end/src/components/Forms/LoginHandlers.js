export const handleLoginSubmit = (loginState, setErrors) => {
  setErrors({});
  const errors = {};

  if (loginState.email === "" || loginState.password === "") {
    errors.invalidEmail = "Invalid Email or Password"
  }

  if (Object.keys(errors).length>0) {
    setErrors(errors);
    return;
  }
}