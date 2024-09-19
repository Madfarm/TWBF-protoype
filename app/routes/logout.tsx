import type { LoaderFunctionArgs } from "@remix-run/node";
import authenticator from "~/lib/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await authenticator.logout(request, { redirectTo: "/" });
};