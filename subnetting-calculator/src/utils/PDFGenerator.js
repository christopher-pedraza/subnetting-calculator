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

export { exportSubnetsToPDF };
