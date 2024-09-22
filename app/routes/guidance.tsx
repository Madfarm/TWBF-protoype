import type { LoaderFunctionArgs } from "@remix-run/node"
import authenticator from "~/lib/auth.server"

export const loader = async({
    request,
}: LoaderFunctionArgs) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login"
    })
}

export default function GuidancePage() {
    return (
        <main>
            <h1>Coming Soon!</h1>
        </main>
    )
}