export function createListener(client, type, filter, timeout, callback) {
    const id = `${type}_${Date.now()}`;
    const listener = {
        id,
        type,
        filter,
        ...(timeout !== undefined ? { timeout } : {}),
        callback: callback || (() => true),
    };
    client.addListener(listener);
    return id;
}
export function removeListener(client, id) {
    const listeners = client.getListeners();
    const index = listeners.findIndex(l => l.id === id);
    if (index !== -1) {
        listeners.splice(index, 1);
    }
}
export async function waitForUpdate(client, type, filter, timeout) {
    return new Promise((resolve, reject) => {
        const id = createListener(client, type, filter, timeout, update => {
            removeListener(client, id);
            resolve(update);
            return true;
        });
        if (timeout) {
            setTimeout(() => {
                removeListener(client, id);
                reject(new Error(`Timeout waiting for ${type} update`));
            }, timeout);
        }
    });
}
//# sourceMappingURL=helpers.js.map