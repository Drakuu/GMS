import { SUPERADMIN } from "../../../../config/superadmin";

export async function POST(req) {
  const { email, password } = await req.json();

  if (
    email === SUPERADMIN.email &&
    password === SUPERADMIN.password
  ) {
    return Response.json({ message: "Superadmin login successful", role: "superadmin" });
  }

  return Response.json({ error: "Invalid superadmin credentials" }, { status: 401 });
}
