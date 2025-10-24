export function wrapHandler(handler) {
    return async (update) => {
        try {
            // Apply filter if provided
            if (handler.filter && !matchesFilter(update, handler.filter)) {
                return;
            }
            // Execute handler
            await handler.callback(update);
        }
        catch (error) {
            console.error(`Error in handler for ${handler.type}:`, error);
        }
    };
}
function matchesFilter(update, filter) {
    // Implement filter matching logic
    // This is a simplified version - in a real implementation, you'd have more complex logic
    if ('from' in update) {
        if (filter.from && update.from !== filter.from) {
            return false;
        }
    }
    if ('to' in update) {
        if (filter.to && update.to !== filter.to) {
            return false;
        }
    }
    // Add more filter conditions as needed
    return true;
}
//# sourceMappingURL=wrapper.js.map