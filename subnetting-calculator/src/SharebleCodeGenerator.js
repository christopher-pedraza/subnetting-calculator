// Import pako for compression (ES module syntax)
import { deflate, inflate } from "pako";

// Function to encode a string to base64 (browser-safe)
function toBase64(str) {
    return btoa(String.fromCharCode(...new Uint8Array(str)));
}

// Function to decode a base64 string
function fromBase64(str) {
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

// Function to convert the JSON data to a short code
export function generateCodeFromData(subnetData) {
    // Step 1: Convert JSON data to a string
    const jsonData = JSON.stringify(subnetData);

    // Step 2: Compress the string data using pako (zlib/gzip)
    const compressedData = deflate(jsonData);

    // Step 3: Convert compressed data to base64 to make it URL-safe
    const base64Code = toBase64(compressedData);

    return base64Code; // This is the generated code
}

// Function to decode the code back into JSON
export function decodeCodeToData(code) {
    // Step 1: Decode the base64 code to compressed binary data
    const compressedData = fromBase64(code);

    // Step 2: Decompress the data using pako
    const jsonData = inflate(compressedData, { to: "string" });

    // Step 3: Parse the JSON string back into an object
    const subnetData = JSON.parse(jsonData);

    return subnetData; // This is the original subnet data
}

// Example usage:
const subnetData = [
    { s: "192.168.1.0", m: 24, h: 254 },
    { s: "10.0.0.0", m: 16, h: 65534 },
];

// Generate a shareable code
const code = generateCodeFromData(subnetData);
console.log("Generated Code:", code);

// Decode the code back to the original subnet data
const decodedData = decodeCodeToData(code);
console.log("Decoded Data:", decodedData);
