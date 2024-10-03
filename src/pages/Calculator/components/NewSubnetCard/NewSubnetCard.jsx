import { Card, CardBody, Button, useDisclosure } from "@nextui-org/react";

import NewSubnetModal from "./components/NewSubnetModal/NewSubnetModal";

export default function NewSubnetCard({ addSubnet, subnets }) {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Card shadow>
                <CardBody className="items-center">
                    <Button isIconOnly onPress={onOpen}>
                        +
                    </Button>
                </CardBody>
            </Card>
            <NewSubnetModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                addSubnet={addSubnet}
                subnets={subnets}
            />
        </>
    );
}
