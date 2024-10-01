import {
    Card,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Snippet,
} from "@nextui-org/react";

import CustomSnippet from "./components/CustomSnippet/CustomSnippet";

export default function SubnetCard({ subnet, removeSubnet }) {
    return (
        <Card className="mb-4">
            <Table>
                <TableHeader>
                    <TableColumn>Network Address</TableColumn>
                    <TableColumn>First Address</TableColumn>
                    <TableColumn>Last Address</TableColumn>
                    <TableColumn>Broadcast Address</TableColumn>
                    <TableColumn>Subnet Mask</TableColumn>
                    <TableColumn>Host Capacity</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <CustomSnippet>
                                {subnet.networkAddress}
                            </CustomSnippet>
                        </TableCell>
                        <TableCell>
                            <CustomSnippet>{subnet.firstAddress}</CustomSnippet>
                        </TableCell>
                        <TableCell>
                            <CustomSnippet>{subnet.lastAddress}</CustomSnippet>
                        </TableCell>
                        <TableCell>
                            <CustomSnippet>
                                {subnet.broadcastAddress}
                            </CustomSnippet>
                        </TableCell>
                        <TableCell>
                            <CustomSnippet>{subnet.subnetMask}</CustomSnippet>
                        </TableCell>
                        <TableCell>
                            <CustomSnippet>{subnet.hostCapacity}</CustomSnippet>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
}
