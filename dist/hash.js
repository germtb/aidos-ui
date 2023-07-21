export function hash(source, modulus) {
    let hash = 0;
    let i;
    let chr;
    if (source.length === 0) {
        return hash;
    }
    for (i = 0; i < source.length; i++) {
        chr = source.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    if (modulus) {
        return Math.abs(hash) % modulus;
    }
    else {
        return Math.abs(hash);
    }
}
//# sourceMappingURL=hash.js.map