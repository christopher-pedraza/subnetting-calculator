// Prompt:
// Generate a js script that based on an initial IPv4 address input, and the number of hosts required, gives you the: network add, first address, last address, and the broadcast address

function ipToBinary(ip) {
    return ip
        .split(".")
        .map((octet) => {
            return parseInt(octet, 10).toString(2).padStart(8, "0");
        })
        .join("");
}

function binaryToIp(binary) {
    return binary
        .match(/.{1,8}/g)
        .map((octet) => parseInt(octet, 2))
        .join(".");
}

function calculateSubnet(ip, numHosts) {
    // Calculate required bits for hosts
    const totalBits = 32; // IPv4 is 32 bits
    let requiredBits = Math.ceil(Math.log2(numHosts + 2)); // +2 for network and broadcast

    // Calculate subnet mask
    let subnetBits = totalBits - requiredBits;
    let subnetMask = ((0xffffffff << requiredBits) >>> 0)
        .toString(2)
        .padStart(32, "0");

    // Calculate network address
    let binaryIp = ipToBinary(ip);
    let networkBinary =
        binaryIp.substring(0, subnetBits) + "0".repeat(requiredBits);
    let networkAddress = binaryToIp(networkBinary);

    // Calculate broadcast address
    let broadcastBinary =
        binaryIp.substring(0, subnetBits) + "1".repeat(requiredBits);
    let broadcastAddress = binaryToIp(broadcastBinary);

    // Calculate first and last usable addresses
    let firstAddressBinary =
        networkBinary.substring(0, networkBinary.length - 1) + "1";
    let lastAddressBinary =
        broadcastBinary.substring(0, broadcastBinary.length - 1) + "0";

    let firstAddress = binaryToIp(firstAddressBinary);
    let lastAddress = binaryToIp(lastAddressBinary);

    return {
        networkAddress,
        firstAddress,
        lastAddress,
        broadcastAddress,
        subnetMask: subnetMask
            .split("")
            .map(
                (bit, index) =>
                    (index % 8 === 0 && index > 0 ? "." : "") +
                    (bit === "1" ? "1" : "0")
            )
            .join("")
            .replace(/\.0+/g, ".0")
            .replace(/\.$/, ""),
    };
}

// Example usage:
const ip = "192.168.0.0"; // Change this to your initial IP address
const numHosts = 2; // Change this to the number of hosts required

const result = calculateSubnet(ip, numHosts);
console.log(`Network Address: ${result.networkAddress}`);
console.log(`First Address: ${result.firstAddress}`);
console.log(`Last Address: ${result.lastAddress}`);
console.log(`Broadcast Address: ${result.broadcastAddress}`);
console.log(`Subnet Mask: ${result.subnetMask}`);
