import { logoutUserAction } from "@/features/auth/server/auth.actions";

const EmployerDashboard = () => {
  return (
    <div>
      <h1>Welcome, Employer</h1>
      <button onClick={logoutUserAction}>Logout</button>
    </div>
  );
};

export default EmployerDashboard;
