import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";

export default function CalculatorNavBar() {
    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <p className="font-bold text-inherit uppercase">
                    Subnetting Calculator
                </p>
            </NavbarBrand>
            <NavbarContent justify="end">
                <NavbarItem>
                    <Button as={Link} color="warning" href="#" variant="shadow">
                        Exportar como PDF
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} color="primary" href="#" variant="shadow">
                        Compartir
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        color="secondary"
                        href="#"
                        variant="shadow"
                    >
                        Importar
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
