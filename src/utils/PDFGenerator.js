import { jsPDF } from "jspdf";

function exportSubnetsToPDF(subnets) {
    const doc = new jsPDF();
    let yPos = 10;
    const boxHeight = 60; // Height of each subnet box
    const pageHeight = 297; // A4 page height in mm

    subnets.forEach((result, index) => {
        if (yPos + boxHeight > pageHeight) {
            doc.addPage();
            yPos = 10;
        }

        // Draw a rectangle around the subnet information
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(5, yPos, 200, boxHeight);

        // Set font size and make "Subnet X" bold
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Subnet ${index + 1}`, 10, yPos + 10);

        // Reset font to normal for the rest of the text
        doc.setFont("helvetica", "normal");
        doc.text(`Network Address: ${result.networkAddress}`, 10, yPos + 20);
        doc.text(`First Address: ${result.firstAddress}`, 10, yPos + 30);
        doc.text(`Last Address: ${result.lastAddress}`, 10, yPos + 40);
        doc.text(
            `Broadcast Address: ${result.broadcastAddress}`,
            10,
            yPos + 50
        );
        doc.text(
            `Subnet Mask: ${result.subnetMask} or /${result.cidr}`,
            110,
            yPos + 20
        );
        doc.text(`Host Capacity: ${result.hostCapacity}`, 110, yPos + 30);

        yPos += boxHeight + 10; // Move yPos for the next subnet
    });

    doc.save("Subnets.pdf");
}

export { exportSubnetsToPDF };
