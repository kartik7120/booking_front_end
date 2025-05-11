function formatDuration(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes

    return `${hours} h ${minutes} m`;
}

export {
    formatDuration,
}