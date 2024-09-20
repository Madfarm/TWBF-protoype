import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import authenticator from "~/lib/auth.server"



import type { ActionFunctionArgs } from "@remix-run/node"
import {
    Form,
    json,
    Link,
    useActionData
} from "@remix-run/react"
import { RegisterUser } from "~/models/user.server"
import { validateAuthForm } from "~/lib/utils"

export const action = async ({
    request
}: ActionFunctionArgs) => {
    const clonedReq = request.clone()

    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    const errorMessages = validateAuthForm(email, password);

    if(errorMessages.emailError || errorMessages.passError) {
        return json({ errorMessages })
    }

    await RegisterUser({ email: email, password: password });

    return await authenticator.authenticate("form", clonedReq, {
        successRedirect: "/login",
        failureRedirect: "/register",
    })
}


export default function Register() {
    const data = useActionData<typeof action>();

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
                <div className="h-1 text-destructive">
                    {data?.errorMessages.emailError || ""}
                </div>
                <Input
                    type="password"
                    placeholder="Password"
                    aria-label="Password"
                    name="password"
                />
                <div className="h-1 text-destructive">
                    {data?.errorMessages.passError || ""}
                </div>
                <Button type="submit">Submit</Button>

                <div className="flex flex-row gap-2 lg:pt-4 sm:pt-1">
                    <p>Already have an account?</p>
                    <Link to="/login" className="hover:opacity-70"><strong>Sign In</strong></Link>
                </div>
            </Form>

        </main>
    )
}