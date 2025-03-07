
export const formatDate = ( dateString : string) => {
    const date = new Date(dateString);
    const options = { year : 'numeric' as const, month : 'short' as const};
    return date.toLocaleString('en-US',options)
}

export const getBase64 = async (file: File | null): Promise<string> => {
    if (file === null) return "";
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result); // Resolve with the base64 string
            } else {
                reject(new Error('Failed to read file as base64.'));
            }
        };
        reader.onerror = (error) => reject(error); // Reject on error
    });
};

function timeAgo(time: string | Date): string {
    const now = new Date();
    const past = new Date(time);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 30) {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    const months = Math.floor(days / 30);
    if (months < 12) {
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }

    const years = Math.floor(months / 12);
    return `${years} year${years !== 1 ? 's' : ''} ago`;
}

export {timeAgo}
