import {
    Card,
    CardBody,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
} from "@nextui-org/react";

import React, { useState } from "react";

export default function NewSubnetCard() {
    const [networkAddress, setNetworkAddress] = useState("");
    const [subnetMask, setSubnetMask] = useState("");
    const [hostCount, setHostCount] = useState("");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Network Address:", networkAddress);
        console.log("Subnet Mask:", subnetMask);
        console.log("Host Count:", hostCount);
    };

    return (
        <>
            <Card shadow>
                <CardBody className="items-center">
                    <Button isIconOnly onPress={onOpen}>
                        +
                    </Button>
                </CardBody>
            </Card>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="dark text-foreground bg-background border border-white"
            >
                <form onSubmit={onSubmit}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Nueva subred
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Dirección de red"
                                        placeholder="X.X.X.X"
                                        isRequired
                                        value={networkAddress}
                                        onChange={(e) =>
                                            setNetworkAddress(e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Máscara de subred"
                                        value={subnetMask}
                                        onChange={(e) =>
                                            setSubnetMask(e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Cantidad de hosts"
                                        value={hostCount}
                                        onChange={(e) =>
                                            setHostCount(e.target.value)
                                        }
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Crear subred
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
}
