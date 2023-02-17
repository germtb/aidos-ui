export function hash(source) {
    let hash = 0;
    let i;
    let chr;
    if (source.length === 0) {
        return hash.toString();
    }
    for (i = 0; i < source.length; i++) {
        chr = source.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash.toString();
}
//# sourceMappingURL=hash.js.map