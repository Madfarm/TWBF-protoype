import { Link } from "@remix-run/react"

export default function ChoosePage() {
    return (
        <main className="flex flex-row w-screen h-screen">
            <Link className="choose-container" to="/learn">
                <div 
                    className="bg-[url('/learn-background.jpg')] choose-image" 
                />
                <h1 className="choose-text">LEARN</h1>
            </Link>
            
            <Link className="choose-container" to="/learn">
                <div 
                    className="bg-[url('/guidance-background.jpg')] choose-image" 
                />
                <h1 className="choose-text">AI Assistant</h1>
            </Link>
        </main>
    )
}