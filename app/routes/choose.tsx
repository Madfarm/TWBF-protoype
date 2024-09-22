import { Link } from "@remix-run/react"

export default function ChoosePage() {
    return (
        <main>
            <Link to="/learn">left</Link>
            <Link to="/guidance">right</Link>
        </main>
    )
}