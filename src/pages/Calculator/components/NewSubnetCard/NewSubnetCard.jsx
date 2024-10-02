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

import { useState, useEffect } from "react";

import {
    calculateSubnet,
    calculateNextNetworkAddress,
} from "@/utils/subnetCalculator";
import { sub } from "framer-motion/client";

export default function NewSubnetCard({ addSubnet, subnets }) {
    const [networkAddress, setNetworkAddress] = useState("");
    const [subnetMask, setSubnetMask] = useState("");
    const [hostCount, setHostCount] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

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
            setNetworkAddress(
                calculateNextNetworkAddress(previousSubnet.broadcastAddress)
            );
        }

        if (networkAddress === "" || (subnetMask === "" && hostCount === "")) {
            return;
        }

        const ipv4Regex =
            /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (!ipv4Regex.test(networkAddress)) {
            return;
        }

        const newHostCount = hostCount === "" ? null : parseInt(hostCount);
        const newSubnetMask = subnetMask === "" ? null : subnetMask;

        const subnet = calculateSubnet(
            networkAddress,
            newHostCount,
            newSubnetMask
        );
        addSubnet(subnet);
        console.log("NUEVA SUBRED:\n\n", subnet);
        clearState();
        onOpenChange();
    };

    const changeUsePreviousSubnet = () => {
        setUsePreviousSubnet(!usePreviousSubnet);
        setIsDisabled(!isDisabled);
    };

    useEffect(() => {
        if (usePreviousSubnet) {
            const previousSubnet = subnets[subnets.length - 1];
            setNetworkAddress(
                calculateNextNetworkAddress(previousSubnet.broadcastAddress)
            );
        }
    }, [usePreviousSubnet, subnets]);

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
                                    New Subnet
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Network Address"
                                        placeholder="X.X.X.X"
                                        isDisabled={isDisabled}
                                        isRequired
                                        autoFocus
                                        value={networkAddress}
                                        onChange={(e) =>
                                            setNetworkAddress(e.target.value)
                                        }
                                    />
                                    <Checkbox
                                        isSelected={usePreviousSubnet}
                                        onValueChange={changeUsePreviousSubnet}
                                    >
                                        Use previous subnet
                                    </Checkbox>
                                    <Input
                                        label="Subnet Mask"
                                        type="number"
                                        max={32}
                                        min={1}
                                        value={subnetMask}
                                        onChange={(e) =>
                                            setSubnetMask(e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Host Count"
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
                                        Cancel
                                    </Button>
                                    <Button color="primary" type="submit">
                                        Add Subnet
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
