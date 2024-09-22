import type { LoaderFunctionArgs } from '@remix-run/node'
import authenticator from '~/lib/auth.server'
import {
    Outlet
} from '@remix-run/react'

export const loader = async({
    request,
}: LoaderFunctionArgs) => {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login"
    })
}



export default function LearnLayout() {
    return (
        <main>
            <Outlet />
        </main>
    )
}