export function useFormatImageUrl(image: { url: string; formats: any }, baseUrl?: string) {
    if (!baseUrl) {
        const config = useRuntimeConfig()
        baseUrl = config.public.strapiUrl
    }

    return {
        url: `${baseUrl}${image.url}`,
        formats: {
            large: image.formats.large
                ? {
                    url: `${baseUrl}${image.formats.large.url}`,
                    width: image.formats.large.width,
                    height: image.formats.large.height
                }
                : undefined,
            medium: image.formats.medium
                ? {
                    url: `${baseUrl}${image.formats.medium.url}`,
                    width: image.formats.medium.width,
                    height: image.formats.medium.height
                }
                : undefined,
            small: image.formats.small
                ? {
                    url: `${baseUrl}${image.formats.small.url}`,
                    width: image.formats.small.width,
                    height: image.formats.small.height
                }
                : undefined,
            thumbnail: image.formats.thumbnail
                ? {
                    url: `${baseUrl}${image.formats.thumbnail.url}`,
                    width: image.formats.thumbnail.width,
                    height: image.formats.thumbnail.height
                }
                : undefined
        }
    }
}