const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  try {
    // Here you would typically make your API call
    const registrationData = {
      name: formData.name.trim(),
      userName: formData.userName.trim(),
      email: formData.email.toLowerCase().trim(),
      password: formData.password,
      role: formData.role,
    };

    if (formData.password !== formData.confirmPassword)
      return toast.error("password are not matching");

    const result = await registerUserAction(registrationData);
    if (result.status === "SUCCESS") toast.success(result.message);
    else toast.error(result.message);
  } catch (error) {}
};

type RegistrationData = {
  name: string,
  userName: string,
  email: string,
  password: string,
  role: "applicant" | "employer",
};

export const registerUserAction = async (data: RegistrationData) => {
  try {
    // console.log(formData.get("name"));
    const { name, userName, email, password, role } = data;

    const hashedPassword = await argon2.hash(password);

    await db
      .insert(users)
      .values({ name, email, password: hashedPassword, userName, role });

    return {
      status: "SUCCESS",
      message: "Registration Completed Successfully",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};
