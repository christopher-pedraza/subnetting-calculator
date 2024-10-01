// Import pako for compression (ES module syntax)
import { deflate, inflate } from "pako";

// Function to encode a string to base64 (URL-safe)
function toBase64(str) {
    let base64 = btoa(String.fromCharCode(...new Uint8Array(str)));
    return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

// Function to decode a URL-safe base64 string
function fromBase64(str) {
    str = str.replace(/-/g, "+").replace(/_/g, "/");
    while (str.length % 4) {
        str += "=";
    }
    return Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
}

// Function to convert the JSON data to a short code
function generateCodeFromData(subnetData) {
    // Step 1: Convert JSON data to a string
    const jsonData = JSON.stringify(subnetData);

    // Step 2: Compress the string data using pako (zlib/gzip)
    const compressedData = deflate(jsonData);

    // Step 3: Convert compressed data to base64 to make it URL-safe
    const base64Code = toBase64(compressedData);

    return base64Code; // This is the generated code
}

// Function to decode the code back into JSON
function decodeCodeToData(code) {
    // Step 1: Decode the base64 code to compressed binary data
    const compressedData = fromBase64(code);

    // Step 2: Decompress the data using pako
    const jsonData = inflate(compressedData, { to: "string" });

    // Step 3: Parse the JSON string back into an object
    const subnetData = JSON.parse(jsonData);

    return subnetData; // This is the original subnet data
}

export { generateCodeFromData, decodeCodeToData };
