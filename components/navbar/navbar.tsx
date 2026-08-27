import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
    return (
        <header className="fixed top-0 z-50 w-full mb-20">
            <nav className="flex min-h-16 w-full items-center justify-between bg-black px-4 py-4 sm:px-8 lg:px-10">
                <Link
                    href="/"
                    className="flex shrink-0 items-center gap-2 sm:gap-3"
                >
                    <Image
                        src="/assets/images/logo1.png"
                        alt="Dev Event logo"
                        width={28}
                        height={28}
                    />
                    <p className="text-base font-semibold text-white sm:text-lg">
                        Dev Event
                    </p>
                </Link>

                <ul className="flex items-center gap-4 text-sm text-white sm:gap-6 sm:text-base lg:gap-10">
                    <li>
                        <Link href="/" className="transition hover:text-indigo-100">
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link href="/events" className="transition hover:text-indigo-100">
                            Events
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/create-event"
                            className="transition hover:text-indigo-100"
                        >
                            Create Event
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;