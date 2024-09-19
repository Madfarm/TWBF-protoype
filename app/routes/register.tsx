import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import authenticator from "~/lib/auth.server"



import type { ActionFunctionArgs } from "@remix-run/node"
import {
    Form,
    Link
} from "@remix-run/react"
import { RegisterUser } from "~/models/user.server"

export const action = async ({
    request
}: ActionFunctionArgs) => {
    const clonedReq = request.clone()

    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    await RegisterUser({ email: email, password: password });

    return await authenticator.authenticate("form", clonedReq, {
        successRedirect: "/login",
        failureRedirect: "/register",
    })
}


export default function Register() {
    return (
        <main className="flex items-center justify-center my-16 h-full">
            <section className="absolute opacity-30 top-0 pointer-events-none brightness-[.40]">
                <img src="/background.jpg" />
            </section>
            <Form
                className="border border-solid rounded-xl w-2/3 space-y-6 p-12 h-96 bg-auth backdrop-blur-[1px]"
                method="post"
            >
                <h2>Sign Up</h2>
                <Input
                    type="text"
                    placeholder="Email"
                    aria-label="Email"
                    name="email"
                />
                <Input
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    name="password"
                />
                <Button type="submit">Submit</Button>

                <div className="flex flex-row gap-2 pt-16">
                    <p>Already have an account?</p>
                    <Link to="/login"><strong>Sign In</strong></Link>
                </div>
            </Form>

        </main>
    )
}