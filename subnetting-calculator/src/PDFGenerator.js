import { jsPDF } from "jspdf";

function exportSubnetsToPDF(subnets) {
    const doc = new jsPDF();
    let yPos = 10;

    subnets.forEach((result, index) => {
        doc.setFontSize(12);
        doc.text(`Subnet ${index + 1}`, 10, yPos);
        yPos += 10;
        doc.text(`Network Address: ${result.networkAddress}`, 10, yPos);
        yPos += 10;
        doc.text(`First Address: ${result.firstAddress}`, 10, yPos);
        yPos += 10;
        doc.text(`Last Address: ${result.lastAddress}`, 10, yPos);
        yPos += 10;
        doc.text(`Broadcast Address: ${result.broadcastAddress}`, 10, yPos);
        yPos += 10;
        doc.text(`Subnet Mask: ${result.subnetMask}`, 10, yPos);
        yPos += 10;
        doc.text(`Host Capacity: ${result.hostCapacity}`, 10, yPos);
        yPos += 20;

        if (yPos > 270) {
            doc.addPage();
            yPos = 10;
        }
    });

    doc.save("subnets.pdf");
}

// Example usage:
const subnets = [
    {
        networkAddress: "192.168.1.0",
        firstAddress: "192.168.1.1",
        lastAddress: "192.168.1.254",
        broadcastAddress: "192.168.1.255",
        subnetMask: "255.255.255.0",
        hostCapacity: 254,
    },
    {
        networkAddress: "192.168.2.0",
        firstAddress: "192.168.2.1",
        lastAddress: "192.168.2.254",
        broadcastAddress: "192.168.2.255",
        subnetMask: "255.255.255.0",
        hostCapacity: 254,
    },
];

exportSubnetsToPDF(subnets);
