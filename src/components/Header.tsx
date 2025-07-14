"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	Bars3Icon,
	XMarkIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<header className="fixed top-0 left-0 right-0 w-full z-[9999] backdrop-blur-3xl bg-black/50 text-white">
			<div className="container mx-auto px-4">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<div className="flex items-center space-x-3">
						<Link
							href="/"
							className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
						>
							<Image
								src="/images/icon_sijunjung.webp"
								alt="Nagari Lima Koto Logo"
								width={32}
								height={32}
								className="w-8 h-8"
							/>
							<span className="text-xl font-semibold">
								Limo Koto
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link
							href="/profil"
							className="hover:text-gray-300 transition-colors"
						>
							Profil
						</Link>
						<Link
							href="/layanan"
							className="hover:text-gray-300 transition-colors"
						>
							Layanan
						</Link>
						<Link
							href="/berita"
							className="hover:text-gray-300 transition-colors"
						>
							Berita
						</Link>
					</nav>

					{/* Mobile menu button */}
					<button
						className="md:hidden p-2"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<XMarkIcon className="w-6 h-6" />
						) : (
							<Bars3Icon className="w-6 h-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden absolute top-16 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/20 z-[9998]">
						<nav className="px-4 py-6 space-y-4">
							<Link
								href="/profil"
								className="block py-2 text-lg hover:text-gray-300 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Profil
							</Link>
							<Link
								href="/layanan"
								className="block py-2 text-lg hover:text-gray-300 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Layanan
							</Link>
							<Link
								href="/berita"
								className="block py-2 text-lg hover:text-gray-300 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Berita
							</Link>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
