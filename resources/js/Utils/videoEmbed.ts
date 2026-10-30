/**
 * Convert raw YouTube, YouTube Playlist, YouTube Shorts, Google Drive, or Vimeo URLs
 * into playable iframe embed URLs on the client side.
 */
export function toEmbedUrl(rawUrl?: string | null): string | null {
    if (!rawUrl) return null;
    const url = rawUrl.trim();
    if (!url) return null;

    // Pure YouTube Playlist: https://www.youtube.com/playlist?list=PL...
    const playlistMatch = url.match(/youtube\.com\/playlist\?.*list=([a-zA-Z0-9_-]+)/i);
    if (playlistMatch) {
        return `https://www.youtube.com/embed/videoseries?list=${playlistMatch[1]}&rel=0`;
    }

    // YouTube Watch / Shorts / Embed / youtu.be (optionally with &list=...)
    const ytMatch = url.match(
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/i
    );
    if (ytMatch) {
        const videoId = ytMatch[1];
        const listParam = url.match(/[?&]list=([a-zA-Z0-9_-]+)/i);
        if (listParam) {
            return `https://www.youtube.com/embed/${videoId}?list=${listParam[1]}&autoplay=1&rel=0`;
        }
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    // Google Drive: https://drive.google.com/file/d/FILE_ID/view...
    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/i);
    if (driveMatch) {
        return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
    }

    // Vimeo: https://vimeo.com/ID
    const vimeoMatch = url.match(
        /vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)/i
    );
    if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[3]}?autoplay=1`;
    }

    return url;
}
