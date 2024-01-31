import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";

const CustomNavbar = () => {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href="/" className="font-bold text-inherit">
          YATZY
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/play" aria-current="page">
            Play
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/stats" color="foreground" >
            Stats
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="/achievements" color="foreground" >
            Achievements
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/leaderboard" color="foreground">
            Leaderboard
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export default CustomNavbar;