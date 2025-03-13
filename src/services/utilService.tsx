
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

export const openResumeInNewTab = (base64String : string) => {
    // Convert Base64 to a Blob
    const byteCharacters = atob(base64String); // Decode Base64
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // Determine MIME type (PDF example)
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a Blob URL
    const blobUrl = URL.createObjectURL(blob);

    // Open in a new tab
    window.open(blobUrl, "_blank");

    // Optional: Revoke Blob URL after some time to free memory
    setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
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
