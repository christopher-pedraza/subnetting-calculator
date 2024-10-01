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

// Convert CIDR mask to binary subnet mask
function cidrToMask(cidr) {
    return "1"
        .repeat(cidr)
        .padEnd(32, "0")
        .match(/.{1,8}/g)
        .map((bin) => parseInt(bin, 2))
        .join(".");
}

// Calculate the number of hosts based on CIDR mask
function calculateHosts(cidr) {
    return Math.pow(2, 32 - cidr) - 2; // Subtracting 2 for network and broadcast addresses
}

function calculateSubnet(ip, numHosts = null, cidr = null) {
    // Calculate based on the CIDR if provided
    if (cidr !== null) {
        let subnetBits = cidr;
        let requiredBits = 32 - subnetBits;
        let subnetMask = cidrToMask(cidr);

        let binaryIp = ipToBinary(ip);
        let networkBinary =
            binaryIp.substring(0, subnetBits) + "0".repeat(requiredBits);
        let broadcastBinary =
            binaryIp.substring(0, subnetBits) + "1".repeat(requiredBits);

        let networkAddress = binaryToIp(networkBinary);
        let broadcastAddress = binaryToIp(broadcastBinary);

        // Calculate first and last usable addresses
        let firstAddressBinary =
            networkBinary.substring(0, networkBinary.length - 1) + "1";
        let lastAddressBinary =
            broadcastBinary.substring(0, broadcastBinary.length - 1) + "0";

        let firstAddress = binaryToIp(firstAddressBinary);
        let lastAddress = binaryToIp(lastAddressBinary);

        // Calculate how many hosts the subnet can support
        let hostCapacity = calculateHosts(cidr);

        return {
            networkAddress,
            firstAddress,
            lastAddress,
            broadcastAddress,
            subnetMask,
            hostCapacity,
        };
    }

    // Calculate based on the number of hosts if no CIDR is provided
    if (numHosts !== null) {
        const totalBits = 32; // IPv4 is 32 bits
        let requiredBits = Math.ceil(Math.log2(numHosts + 2)); // +2 for network and broadcast
        let subnetBits = totalBits - requiredBits;
        let subnetMask = cidrToMask(subnetBits);

        let binaryIp = ipToBinary(ip);
        let networkBinary =
            binaryIp.substring(0, subnetBits) + "0".repeat(requiredBits);
        let broadcastBinary =
            binaryIp.substring(0, subnetBits) + "1".repeat(requiredBits);

        let networkAddress = binaryToIp(networkBinary);
        let broadcastAddress = binaryToIp(broadcastBinary);

        // Calculate first and last usable addresses
        let firstAddressBinary =
            networkBinary.substring(0, networkBinary.length - 1) + "1";
        let lastAddressBinary =
            broadcastBinary.substring(0, broadcastBinary.length - 1) + "0";

        let firstAddress = binaryToIp(firstAddressBinary);
        let lastAddress = binaryToIp(lastAddressBinary);

        // Calculate how many hosts the subnet can support
        let hostCapacity = calculateHosts(subnetBits);

        return {
            networkAddress,
            firstAddress,
            lastAddress,
            broadcastAddress,
            subnetMask,
            hostCapacity,
        };
    }

    throw new Error("Either numHosts or CIDR must be provided.");
}

function calculateNextNetworkAddress(broadcastAddress) {
    const binaryBroadcast = ipToBinary(broadcastAddress);
    const nextNetworkBinary = (BigInt("0b" + binaryBroadcast) + BigInt(1))
        .toString(2)
        .padStart(32, "0");
    return binaryToIp(nextNetworkBinary);
}

export { calculateSubnet, calculateNextNetworkAddress };
