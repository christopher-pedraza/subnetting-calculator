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
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Exportar como PDF
                    </Button>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Compartir
                    </Button>
                    <Button as={Link} color="primary" href="#" variant="flat">
                        Importar
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
