import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@nextui-org/react";

import { generateCodeFromData } from "@/utils/SharebleCodeGenerator";

import { useState, useEffect } from "react";

export default function CalculatorNavBar({ subnets }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            share();
            setTimeout(() => setIsOpen(false), 2000);
        }
    }, [isOpen]);

    const share = () => {
        const shareCode = generateCodeFromData(subnets);
        navigator.clipboard.writeText(shareCode);
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
                    <Popover
                        placement="bottom"
                        color="default"
                        className="dark text-foreground"
                        isOpen={isOpen}
                        onOpenChange={(open) => setIsOpen(open)}
                    >
                        <PopoverTrigger>
                            <Button
                                as={Link}
                                color="primary"
                                href="#"
                                variant="shadow"
                            >
                                Compartir
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="text-small font-bold">
                                ¡Código para compartir copiado!
                            </div>
                        </PopoverContent>
                    </Popover>
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
