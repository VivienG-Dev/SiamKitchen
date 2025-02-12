import { z } from 'zod'

const imageFormatSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

export const imageSchema = z.object({
    alternativeText: z.string().nullable().optional(),
    formats: z.object({
        large: imageFormatSchema.optional(),
        medium: imageFormatSchema.optional(),
        small: imageFormatSchema.optional(),
        thumbnail: imageFormatSchema.optional()
    }),
    url: z.string()
})

export const siteSchema = z.object({
    data: z.object({
        siteName: z.string(),
        siteDescription: z.string(),
        heroImage: imageSchema.nullable(),
        openingHours: z.array(z.object({
            id: z.number(),
            openingHoursDay: z.string().nullable(),
            startingTime: z.string().nullable(),
            endingTime: z.string().nullable(),
        })),
        phoneNumber: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        address: z.string().nullable().optional(),
    })
})

export type SiteData = z.infer<typeof siteSchema>