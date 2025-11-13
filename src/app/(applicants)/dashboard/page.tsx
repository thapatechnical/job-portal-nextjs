//* Route Groups in Next.js are a feature introduced to help you organize routes inside the app/ directory without affecting the actual URL structure. They are created by wrapping a folder name inside parentheses, for example:
//! app/(auth)/login/page.js
//! app/(dashboard)/users/page.js

import { logoutUserAction } from "@/features/auth/server/auth.actions";

//! What Route Groups Do
// 1. Organize your project without changing URLs

//? 2. Apply different layouts to different sections
//! Route groups allow you to define multiple layouts inside a single Next.js project.
// app/(auth)/layout.js       → used for login, register pages
// app/(dashboard)/layout.js  → used for dashboard pages

// 3. Better code splitting and maintainability

const ApplicantDashboard = () => {
  return (
    <div>
      <h1>Hello Applicant Dashboard</h1>
      <button onClick={logoutUserAction}>Logout</button>
    </div>
  );
};

export default ApplicantDashboard;
