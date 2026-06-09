/**
 * Optimizes Cloudinary URLs by adding automatic format, quality, and bitrate parameters.
 * 
 * - Images: Adds `f_auto,q_auto`
 * - Videos: Adds `f_auto,q_auto,vc_auto`
 * - Audio: Adds `br_128k`
 */
export function optimizeCloudinaryUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return url || '';

  // Only apply to Cloudinary URLs that have '/upload/' segment
  if (!url.includes('cloudinary.com') || !url.includes('/upload/')) {
    return url;
  }

  // Clean the URL or check the extension (ignoring query params if any)
  const urlWithoutQuery = url.split('?')[0];
  const lowerUrl = urlWithoutQuery.toLowerCase();

  if (lowerUrl.endsWith('.mp3') || lowerUrl.endsWith('.wav') || lowerUrl.endsWith('.ogg') || lowerUrl.endsWith('.aac')) {
    return url.replace('/upload/', '/upload/br_128k/');
  }

  if (lowerUrl.endsWith('.mp4') || lowerUrl.endsWith('.webm') || lowerUrl.endsWith('.mov') || lowerUrl.endsWith('.ogv') || lowerUrl.endsWith('.3gp')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto,vc_auto/');
  }

  // Default to image optimization
  return url.replace('/upload/', '/upload/f_auto,q_auto/');
}
