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

export default function Calculator() {
    return (
        <>
            <CalculatorNavBar />
        </>
    );
}
