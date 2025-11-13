"use server";

import { db } from "@/config/db";
import { applicants, employers, users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import {
  LoginUserData,
  loginUserSchema,
  RegisterUserData,
  registerUserSchema,
} from "../auth.schema";
import {
  createSessionAndSetCookies,
  invalidateSession,
} from "./use-cases/sessions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

// 👉 Server Actions in Next.js are special functions that run only on the server, not in the user’s browser.

// They let you perform things like database queries, API calls, form submissions, or data mutations directly from your React components — without creating a separate API route.

// You just mark a function with "use server", and Next.js automatically runs it on the server.

//*When you submit a <form> in Next.js using action={yourServerAction}, the framework sends a FormData object to that server function.

// FormData is a built-in Web API type (just like Request, Response, or URLSearchParams).

// It provides methods like .get(), .set(), .append(), and .entries() — which you’re already using here.

export const registerUserAction = async (data: RegisterUserData) => {
  try {
    const { data: validatedData, error } = registerUserSchema.safeParse(data);
    if (error) return { status: "ERROR", message: error.issues[0].message };
    // console.log(formData.get("name"));
    const { name, userName, email, password, role } = validatedData;

    const [user] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));

    if (user) {
      if (user.email === email)
        return { status: "ERROR", message: "Email Already Exists" };
      else
        return {
          status: "ERROR",
          message: "UseName Already Exists",
        };
    }

    const hashPassword = await argon2.hash(password);

    await db.transaction(async (tx) => {
      const [result] = await tx
        .insert(users)
        .values({ name, userName, email, password: hashPassword, role });

      console.log(result);

      if (role === "applicant") {
        await tx.insert(applicants).values({ id: result.insertId });
      } else {
        await tx.insert(employers).values({ id: result.insertId });
      }

      await createSessionAndSetCookies(result.insertId, tx);
    });

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

// type LoginData = {
//   email: string;
//   password: string;
// };

export const loginUserAction = async (data: LoginUserData) => {
  try {
    const { data: validatedData, error } = loginUserSchema.safeParse(data);
    if (error) return { status: "ERROR", message: error.issues[0].message };
    // console.log(formData.get("name"));
    const { email, password } = validatedData;
    // const { email, password } = data;

    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user) {
      return { status: "ERROR", message: "Invalid Email or Password" };
    }

    const isValidPassword = await argon2.verify(user.password, password);

    if (!isValidPassword)
      return { status: "ERROR", message: "Invalid Email or Password" };

    await createSessionAndSetCookies(user.id);

    return {
      status: "SUCCESS",
      message: "Login Successful",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: "Unknown Error Occurred! Please Try Again Later",
    };
  }
};

// logout user
export const logoutUserAction = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) return redirect("/login");
  console.log(session);

  const hashedToken = crypto
    .createHash("sha-256")
    .update(session)
    .digest("hex");

  await invalidateSession(hashedToken);
  cookieStore.delete("session");

  return redirect("/login");
};
