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
    Checkbox,
} from "@nextui-org/react";

import React, { useState } from "react";

import calculateSubnet from "@/utils/subnetCalculator";

export default function NewSubnetCard({ addSubnet, subnets }) {
    const [networkAddress, setNetworkAddress] = useState("");
    const [subnetMask, setSubnetMask] = useState("");
    const [hostCount, setHostCount] = useState("");

    const [usePreviousSubnet, setUsePreviousSubnet] = useState(false);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const clearState = () => {
        setNetworkAddress("");
        setSubnetMask("");
        setHostCount("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        if (usePreviousSubnet) {
            const previousSubnet = subnets[subnets.length - 1];
            // TODO: se necesita sumar 1 a la dirección de broadcast para que sea una direccion de red
            setNetworkAddress(previousSubnet.broadcastAddress);
        }

        if (networkAddress === "" || (subnetMask === "" && hostCount === "")) {
            return;
        }

        const ipv4Regex =
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipv4Regex.test(networkAddress)) {
            return;
        }

        const subnet = calculateSubnet(networkAddress, hostCount, subnetMask);
        addSubnet(subnet);
        clearState();
        onOpenChange();
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
                onOpenChange={(isOpen) => {
                    onOpenChange(isOpen);
                    if (!isOpen) clearState();
                }}
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
                                    <Checkbox
                                        isSelected={usePreviousSubnet}
                                        onValueChange={setUsePreviousSubnet}
                                    >
                                        Usar subred anterior
                                    </Checkbox>
                                    <Input
                                        label="Máscara de subred"
                                        type="number"
                                        max={32}
                                        min={1}
                                        value={subnetMask}
                                        onChange={(e) =>
                                            setSubnetMask(e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Cantidad de hosts"
                                        type="number"
                                        min={1}
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
