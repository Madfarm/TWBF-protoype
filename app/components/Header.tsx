import { LaptopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "@remix-run/react";
import * as React from "react";
import { useHydrated } from "remix-utils/use-hydrated";

import {
    getTheme,
    setTheme as setSystemTheme,
} from "./theme-switcher";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useOptionalUser } from "~/lib/utils";


export function Header() {
    const hydrated = useHydrated();
    const [, rerender] = React.useState({});
    const setTheme = React.useCallback((theme: string) => {
        setSystemTheme(theme);
        rerender({});
    }, []);
    const theme = getTheme();
    const user = useOptionalUser();
    const location = useLocation();



    return (
        <header className="flex h-14 items-center justify-between px-4 py-2 md:py-4">
            <div className="flex items-center space-x-4">
                <Link className="flex items-center space-x-2" to="/">
                    {/* <HomeIcon className="h-6 w-6" /> */}
                    <span className="text-lg font-bold">TWBF</span>
                </Link>
            </div>

            <div className="flex flex-row items-center gap-4">
                {location.pathname != "/choose" ?
                    !user ?
                        (<>
                            <Link to="login">Sign In</Link>
                            <Link to="/register">
                                <Button className="bg-foreground rounded-full">Get Started</Button>
                            </Link>
                        </>)
                        :
                        (<>
                            <Link to="/learn">My Learning</Link>
                            <Link to="/guidance">
                                <Button className="bg-foreground rounded-full">Guidance</Button>
                            </Link>
                        </>)
                    : (
                        <Link to="/logout">
                            <Button className="bg-foreground rounded-full">Sign Out</Button>
                        </Link>
                    )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="w-10 h-10 rounded-full border"
                            size="icon"
                            variant="ghost"
                        >
                            <span className="sr-only">Theme selector</span>
                            {!hydrated ? null : theme === "dark" ? (
                                <MoonIcon />
                            ) : theme === "light" ? (
                                <SunIcon />
                            ) : (
                                <LaptopIcon />
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2">
                        <DropdownMenuLabel>Theme</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full"
                                onClick={() => setTheme("light")}
                                aria-selected={theme === "light"}
                            >
                                Light
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full"
                                onClick={() => setTheme("dark")}
                                aria-selected={theme === "dark"}
                            >
                                Dark
                            </button>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <button
                                type="button"
                                className="w-full"
                                onClick={() => setTheme("system")}
                                aria-selected={theme === "system"}
                            >
                                System
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}