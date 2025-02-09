export function useFormatImageUrl(image: { url: string; formats: any }, baseUrl?: string) {
    if (!baseUrl) {
        const config = useRuntimeConfig()
        baseUrl = config.public.strapiUrl
    }

    return {
        url: `${baseUrl}${image.url}`,
        formats: {
            large: image.formats.large ? { url: `${baseUrl}${image.formats.large.url}` } : null,
            medium: image.formats.medium ? { url: `${baseUrl}${image.formats.medium.url}` } : null,
            small: image.formats.small ? { url: `${baseUrl}${image.formats.small.url}` } : null,
            thumbnail: image.formats.thumbnail ? { url: `${baseUrl}${image.formats.thumbnail.url}` } : null
        }
    }
}