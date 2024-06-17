const RegisterHttpError = (error) => {
  if (error.message.includes("email")) {
    const err = new Error("Invalid email");
    err.status = 400;
    throw err;
  }

  if (error.message.includes("password")) {
    const err = new Error("The password must contain at least 6 characters");
    err.status = 400;
    throw err;
  }

  if (error.message.includes("phone")) {
    const err = new Error("Invalid phone number");
    err.status = 400;
    throw err;
  }

  return error;
};

export default RegisterHttpError;
