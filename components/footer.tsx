"use client"

import Link from "next/link"
import {Github, Twitter, Linkedin} from "lucide-react"

export default function Footer() {
    return (
        <footer className="bg-background border-t max-h-[20%]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="py-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-center md:text-left">
                            <h3 className="font-bold">Todo App</h3>
                            <p className="text-sm text-foreground/60">
                                &copy; {new Date().getFullYear()} All rights reserved.
                            </p>
                        </div>
                        <div className="flex space-x-6">
                            <Link href="https://github.com" className="text-foreground/60 hover:text-foreground">
                                <Github className="h-5 w-5"/>
                            </Link>
                            <Link href="https://twitter.com" className="text-foreground/60 hover:text-foreground">
                                <Twitter className="h-5 w-5"/>
                            </Link>
                            <Link href="https://linkedin.com" className="text-foreground/60 hover:text-foreground">
                                <Linkedin className="h-5 w-5"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}



