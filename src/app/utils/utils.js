function generateQueryConstructor(query) {
    const keys = Object.keys(query);
    keys.forEach((key) => {
        this[key] = query[key];
    });
}

export { generateQueryConstructor };
