import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/modal";
import { Snippet } from "@nextui-org/snippet";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
} from "@nextui-org/table";

import CalculatorNavBar from "./components/CalculatorNavBar/CalculatorNavBar";
import NewSubnetCard from "./components/NewSubnetCard/NewSubnetCard";

import { useState } from "react";

export default function Calculator() {
    const [subnets, setSubnets] = useState([]);

    const addSubnet = (subnet) => {
        setSubnets([...subnets, subnet]);
        console.log(subnets);
    };

    const removeSubnet = (index) => {
        setSubnets(subnets.filter((_, i) => i !== index));
    };

    return (
        <>
            <CalculatorNavBar />
            <div className="p-8">
                <NewSubnetCard addSubnet={addSubnet} />
            </div>
        </>
    );
}
