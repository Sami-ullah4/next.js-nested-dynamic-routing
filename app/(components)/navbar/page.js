import Link from "next/link";
import { Logo } from "./logo";
import {NavLinks} from "./links";
import {Search} from "./search";
import {MenuIcon} from "./menu.js"

export default function Navbar() {
  return (
    <nav className="w-full p-4 flex items-center justify-between shadow-md bg-white">
      <Link href="/">
        <Logo />
      </Link>
      <NavLinks />
      <Search />
      <MenuIcon/>
    </nav>
  );
}
