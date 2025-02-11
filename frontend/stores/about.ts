import { defineStore } from 'pinia'
import type { AboutResponse } from '~/types/about'
import { aboutResponseSchema } from '~/types/about'
import { useFormatImageUrl } from '~/composables/useFormatImageUrl'

export const useAboutStore = defineStore('about', {
    state: () => ({
        data: null as AboutResponse | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        aboutPageImageUrl: (state) => state.data?.data.aboutPageImage?.url || null
    },

    actions: {
        async fetchAbout() {
            const config = useRuntimeConfig()
            const baseUrl = config.public.strapiUrl
            const apiUrl = `${baseUrl}/api/about-page?populate[Team][populate]=*&populate[About][populate]=*&populate[aboutPageImage][populate]=*`

            const { data, error } = await useFetch<AboutResponse>(apiUrl, {
                key: 'about-data',
                server: true,
                lazy: false,
                transform: (response) => {
                    const parsed = aboutResponseSchema.parse(response)
                    if (parsed.data) {
                        if (parsed.data.aboutPageImage) {
                            parsed.data.aboutPageImage = useFormatImageUrl(parsed.data.aboutPageImage, baseUrl)
                        }
                        if (parsed.data.Team) {
                            parsed.data.Team = parsed.data.Team.map(teamMember => {
                                if (teamMember.teamImage) {
                                    teamMember.teamImage = useFormatImageUrl(teamMember.teamImage, baseUrl)
                                }
                                return teamMember
                            })
                        }
                        if (parsed.data.About) {
                            parsed.data.About = parsed.data.About.map(aboutBlock => {
                                if (aboutBlock.aboutBlockImage) {
                                    aboutBlock.aboutBlockImage = useFormatImageUrl(aboutBlock.aboutBlockImage, baseUrl)
                                }
                                return aboutBlock
                            })
                        }
                    }
                    return parsed
                }
            })

            if (error.value) {
                this.error = error.value.message
                console.error('Error loading about data:', error.value)
            }

            this.data = data.value ?? null
        }
    }
})