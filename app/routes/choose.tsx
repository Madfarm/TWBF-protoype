import { Link } from "@remix-run/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import authenticator from "~/lib/auth.server"

export const loader = async({
    request
}: LoaderFunctionArgs) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login"
    })
}

export default function ChoosePage() {
    return (
        <main className="flex flex-row w-screen h-screen">
            <Link className="choose-container" to="/learn">
                <div className="bg-[url('/learn-background.jpg')] choose-image" />
                <h1 className="choose-text">LEARN</h1>
            </Link>
            
            <Link className="choose-container" to="/guidance">
                <div className="bg-[url('/guidance-background.jpg')] choose-image" />
                <h1 className="choose-text">AI Assistant</h1>
            </Link>
        </main>
    )
}