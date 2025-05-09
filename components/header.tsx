"use client"

import Link from "next/link"
import {useState} from "react"
import {Menu, X} from "lucide-react"
import {Button} from "@/components/ui/button"

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <header className="bg-background border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold">
                            Todo App
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex space-x-4">
                        <Link href="/" className="text-foreground/60 hover:text-foreground">
                            Home
                        </Link>
                        <Link href="/about" className="text-foreground/60 hover:text-foreground">
                            About
                        </Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <Button variant="ghost" size="icon" onClick={toggleMenu}>
                            {isMenuOpen ? <X className="h-6 w-6"/> : <Menu className="h-6 w-6"/>}
                        </Button>
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            <Link
                                href="/"
                                className="block px-3 py-2 rounded-md text-foreground/60 hover:text-foreground"
                                onClick={toggleMenu}
                            >
                                Home
                            </Link>
                            <Link
                                href="/about"
                                className="block px-3 py-2 rounded-md text-foreground/60 hover:text-foreground"
                                onClick={toggleMenu}
                            >
                                About
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}




