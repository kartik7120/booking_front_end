import { v4 as uuidv4 } from 'uuid';

function formatDuration(milliseconds: number) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60)); // Calculate hours
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60)); // Calculate remaining minutes

    return `${hours} h ${minutes} m`;
}

function generateIdempotentKey(): string {
    return uuidv4(); // Generate a unique idempotent key using UUID
}

export {
    formatDuration,
    generateIdempotentKey
}