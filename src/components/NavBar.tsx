import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const links = [
        { label: "About", href: "#about" },
        { label: "Skills", href: "#skills" },
        { label: "Experiences", href: "#experiences" },
        { label: "Education", href: "#education" },
        { label: "Certifications", href: "#certifications" },
        { label: "Blogs", href: "#blogs" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <nav
            className={cn(
                "sticky top-0 w-full z-50 transition-colors duration-300",
                isScrolled ? "bg-[#FFFDD0] shadow-md" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 md:px-8 py-9 flex items-center justify-between">
                {/* Logo */}
                <div className="absolute left-3 md:left-6 flex items-center">
                    <img
                        src="/src/assets/Logo.png"
                        alt="Kayne's Logo"
                        className="h-12 md:h-16"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 justify-center flex-1">
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-10">
                            {links.map((link) => (
                                <NavigationMenuItem key={link.label}>
                                    <NavigationMenuLink
                                        href={link.href}
                                        className="text-gray-800 hover:text-gray-600 transition-colors"
                                    >
                                        {link.label}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Resume Button */}
                <div className="absolute right-4 md:right-8 hidden md:block">
                    <Button className="bg-[#0A4988] text-white hover:bg-[#083968]">
                        Download Resume
                    </Button>
                </div>

                {/* Hamburger Menu Toggle */}
                <div className="md:hidden flex items-center absolute right-4">
                    <button
                        className="text-gray-800 hover:text-gray-600 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#FFFDD0] border-t border-gray-300">
                    <ul className="flex flex-col items-center space-y-2 py-4">
                        {links.map((link) => (
                            <li key={link.label} className="w-full text-center">
                                <a
                                    href={link.href}
                                    className="block w-full px-4 py-2 hover:bg-gray-200 transition-colors"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                        <li className="w-full text-center">
                            <Button className="w-full bg-[#0A4988] text-white hover:bg-[#083968]">
                                Download Resume
                            </Button>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};
