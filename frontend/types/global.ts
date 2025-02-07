import { z } from 'zod'

const imageFormatSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const imageSchema = z.object({
    alternativeText: z.string().nullable().optional(),
    formats: z.object({
        large: imageFormatSchema.optional(),
        medium: imageFormatSchema.optional(),
        small: imageFormatSchema.optional(),
        thumbnail: imageFormatSchema.optional()
    }),
    url: z.string() // original size
})

export const siteSchema = z.object({
    data: z.object({
        siteName: z.string(),
        siteDescription: z.string(),
        heroImage: imageSchema.nullable()
    })
})

export type SiteData = z.infer<typeof siteSchema>