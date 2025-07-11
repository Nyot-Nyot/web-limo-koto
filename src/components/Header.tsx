"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
	MagnifyingGlassIcon,
	UserIcon,
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
								src="/images/icon_sijunjung.png"
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
						<a
							href="/profil"
							className="hover:text-gray-300 transition-colors"
						>
							Profil
						</a>
						<a
							href="/layanan"
							className="hover:text-gray-300 transition-colors"
						>
							Layanan
						</a>
						<a
							href="/berita"
							className="hover:text-gray-300 transition-colors"
						>
							Berita
						</a>
					</nav>

					{/* Search and User */}
					<div className="hidden md:flex items-center space-x-4">
						<div className="relative">
							<input
								type="text"
								placeholder="Search..."
								className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
							/>
							<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
						</div>
						<Link href="/admin/login" className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
							<UserIcon className="w-5 h-5" />
						</Link>
					</div>

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
							<a
								href="/profil"
								className="block py-2 text-lg hover:text-gray-300 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Profil
							</a>
							<a
								href="/layanan"
								className="block py-2 text-lg hover:text-gray-300 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Layanan
							</a>
							<a
								href="/berita"
								className="block py-2 text-lg hover:text-gray-300 transition-colors"
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Berita
							</a>
							<div className="pt-4 border-t border-white/20">
								<div className="relative mb-4">
									<input
										type="text"
										placeholder="Search..."
										className="w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
									/>
									<MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/70" />
								</div>
								<Link href="/admin/login" className="flex items-center space-x-2 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
									<UserIcon className="w-5 h-5" />
									<span>Profile</span>
								</Link>
							</div>
						</nav>
					</div>
				)}
			</div>
		</header>
	);
}
