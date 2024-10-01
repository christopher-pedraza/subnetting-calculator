import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@nextui-org/react";

import { generateCodeFromData } from "@/utils/SharebleCodeGenerator";

export default function CalculatorNavBar({ subnets }) {
    const share = () => {
        const shareCode = generateCodeFromData(subnets);
        const shareUrl = `${window.location.origin}/${shareCode}`;

        navigator.clipboard.writeText(shareUrl);
        alert("El enlace ha sido copiado al portapapeles");
    };

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
                    <Button
                        as={Link}
                        color="primary"
                        href="#"
                        variant="shadow"
                        onPress={share}
                    >
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
