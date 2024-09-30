import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
} from "@nextui-org/navbar";

export default function CalculatorNavBar() {
    return (
        <Navbar shouldHideOnScroll>
            <NavbarBrand>
                <AcmeLogo />
                <p className="font-bold text-inherit">ACME</p>
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
