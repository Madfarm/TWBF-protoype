import {
    Outlet
} from '@remix-run/react'

export default function LearnLayout() {
    return (
        <main>
            <Outlet />
        </main>
    )
}