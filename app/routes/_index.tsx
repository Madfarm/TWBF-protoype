import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "TWBF Prototype" },
    { name: "Learning of the future", content: "Welcome to TWBF" },
  ];
};

export default function Index() {
  return (
    <main>
      <section className="absolute opacity-20 top-0 pointer-events-none">
        <img src="/background.jpg" />
      </section>

      <section className="mt-48 px-28">
        <h1 className="font-semibold text-4xl"><strong>Start using your whole brain today</strong></h1>
        <p>Innovative neuroscience research facilitating AI and Microsoft please. No disjoints <br /> No cortisol. No rent. Fund your AI cash flow brain chart tables for learning AI please</p>

        <div className="mt-10">
          <Link to="/login">
            <Button variant={"ghost"}>Sign In</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-foreground rounded-full">Get Started</Button>
          </Link>
        </div>
      </section>

    </main>
  );
}
