export const usePreloadImage = (imageUrl: string | null | undefined) => {
    if (imageUrl) {
        useHead({
            link: [{ rel: 'preload', href: imageUrl, as: 'image' }]
        })
    }
}