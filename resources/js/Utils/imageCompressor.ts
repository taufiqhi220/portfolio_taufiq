/**
 * Compress and resize large raster images in the browser before uploading
 * so they never exceed serverless payload limits (Vercel 4.5MB / PHP 2MB)
 * and load rapidly from database storage.
 * SVG and GIF files are returned untouched.
 */
export async function compressImageFile(
    file: File,
    maxDimension = 1600,
    quality = 0.85
): Promise<File> {
    if (typeof window === 'undefined') {
        return file;
    }

    const type = file.type.toLowerCase();
    const name = file.name.toLowerCase();

    // Never re-encode vector SVGs or animated GIFs
    if (type === 'image/svg+xml' || name.endsWith('.svg') || type === 'image/gif' || name.endsWith('.gif')) {
        return file;
    }

    // If already small (< 200 KB) and a standard web image, keep as-is
    if (file.size <= 200 * 1024 && (type === 'image/webp' || type === 'image/png' || type === 'image/jpeg')) {
        return file;
    }

    return new Promise((resolve) => {
        const objectUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            URL.revokeObjectURL(objectUrl);

            let width = img.naturalWidth || img.width;
            let height = img.naturalHeight || img.height;

            if (!width || !height) {
                resolve(file);
                return;
            }

            if (width > maxDimension || height > maxDimension) {
                if (width >= height) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                } else {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(file);
                return;
            }

            ctx.drawImage(img, 0, 0, width, height);

            // Export as WebP (supports both transparency and high compression)
            const outputMime = 'image/webp';
            canvas.toBlob(
                (blob) => {
                    if (!blob || blob.size >= file.size) {
                        resolve(file);
                        return;
                    }

                    const baseName = file.name.replace(/\.[^/.]+$/, '');
                    const compressedFile = new File([blob], `${baseName}.webp`, {
                        type: outputMime,
                        lastModified: Date.now(),
                    });

                    resolve(compressedFile);
                },
                outputMime,
                quality
            );
        };

        img.onerror = () => {
            URL.revokeObjectURL(objectUrl);
            resolve(file);
        };

        img.src = objectUrl;
    });
}
