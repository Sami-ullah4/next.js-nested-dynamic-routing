import Link from "next/link";

export  function NavLinks() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Blogs", path: "/blogs" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <ul className="flex gap-6">
      {links.map((link) => (
        <li key={link.path}>
          <Link href={link.path} className="hover:text-blue-500">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
