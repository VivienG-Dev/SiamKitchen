export function useFormatImageUrl(image: { url: string; formats: any }, baseUrl?: string) {
    if (!baseUrl) {
        const config = useRuntimeConfig()
        baseUrl = config.public.strapiUrl
    }

    // Force HTTPS by replacing http:// with https://
    const secureBaseUrl = baseUrl.replace('http://', 'https://')

    return {
        url: `${secureBaseUrl}${image.url}`,
        formats: {
            large: image.formats.large
                ? {
                    url: `${secureBaseUrl}${image.formats.large.url}`,
                    width: image.formats.large.width,
                    height: image.formats.large.height
                }
                : undefined,
            medium: image.formats.medium
                ? {
                    url: `${secureBaseUrl}${image.formats.medium.url}`,
                    width: image.formats.medium.width,
                    height: image.formats.medium.height
                }
                : undefined,
            small: image.formats.small
                ? {
                    url: `${secureBaseUrl}${image.formats.small.url}`,
                    width: image.formats.small.width,
                    height: image.formats.small.height
                }
                : undefined,
            thumbnail: image.formats.thumbnail
                ? {
                    url: `${secureBaseUrl}${image.formats.thumbnail.url}`,
                    width: image.formats.thumbnail.width,
                    height: image.formats.thumbnail.height
                }
                : undefined
        }
    }
}