import RegistrationForm from "@/features/auth/components/register-form";
import { getCurrentUser } from "@/features/auth/server/auth.queries";
import { redirect } from "next/navigation";

const Registration = async () => {
  const user = await getCurrentUser();

  if (user) {
    if (user.role === "applicant") return redirect("/dashboard");
    if (user.role === "employer") return redirect("/employer-dashboard");
  }

  return (
    <>
      <RegistrationForm />
    </>
  );
};

export default Registration;
