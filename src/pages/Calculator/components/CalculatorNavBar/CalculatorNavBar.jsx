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
    Input,
} from "@nextui-org/react";

import {
    generateCodeFromData,
    decodeCodeToData,
} from "@/utils/SharebleCodeGenerator";

import { exportSubnetsToPDF } from "@/utils/PDFGenerator";

import { useState, useEffect } from "react";

export default function CalculatorNavBar({ subnets, setSubnets }) {
    const [isOpenShare, setIsOpenShare] = useState(false);
    const [isOpenImport, setIsOpenImport] = useState(false);
    const [isOpenExport, setIsOpenExport] = useState(false);
    const [shareCode, setShareCode] = useState("");

    useEffect(() => {
        if (isOpenShare) {
            share();
            setTimeout(() => setIsOpenShare(false), 2000);
        }
    }, [isOpenShare]);

    useEffect(() => {
        if (isOpenExport) {
            exportSubnetsToPDF(subnets);
            setTimeout(() => setIsOpenExport(false), 2000);
        }
    }, [isOpenExport]);

    const share = () => {
        const shareCode = generateCodeFromData(subnets);
        navigator.clipboard.writeText(shareCode);
    };

    const importCode = () => {
        const importedData = decodeCodeToData(shareCode);
        setSubnets(importedData);
        setIsOpenImport(false);
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
                    <Popover
                        placement="bottom"
                        color="default"
                        className="dark text-foreground"
                        isOpen={isOpenExport}
                        onOpenChange={(open) => setIsOpenExport(open)}
                    >
                        <PopoverTrigger>
                            <Button
                                as={Link}
                                color="warning"
                                href="#"
                                variant="shadow"
                            >
                                Export as a PDF
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="text-small font-bold">
                                PDF exported!
                            </div>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
                <NavbarItem>
                    <Popover
                        placement="bottom"
                        color="default"
                        className="dark text-foreground"
                        isOpen={isOpenShare}
                        onOpenChange={(open) => setIsOpenShare(open)}
                    >
                        <PopoverTrigger>
                            <Button
                                as={Link}
                                color="primary"
                                href="#"
                                variant="shadow"
                            >
                                Share
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="text-small font-bold">
                                Shareable code copied!
                            </div>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
                <NavbarItem>
                    <Popover
                        placement="bottom"
                        color="default"
                        className="dark text-foreground"
                        isOpen={isOpenImport}
                        onOpenChange={(open) => {
                            setIsOpenImport(open);
                            if (!open) setShareCode("");
                        }}
                    >
                        <PopoverTrigger>
                            <Button
                                as={Link}
                                color="secondary"
                                href="#"
                                variant="shadow"
                            >
                                Import
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div>
                                <Input
                                    label="Code"
                                    size="sm"
                                    variant="bordered"
                                    className="mb-2"
                                    value={shareCode}
                                    onChange={(e) =>
                                        setShareCode(e.target.value)
                                    }
                                />
                                <Button
                                    color="secondary"
                                    variant="shadow"
                                    fullWidth
                                    size="sm"
                                    onClick={importCode}
                                >
                                    Import
                                </Button>
                            </div>
                        </PopoverContent>
                    </Popover>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
}
