import { z } from 'zod'
import { imageSchema } from './global'

export const contactPageSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    contactPageTitle: z.string(),
    contactPageDescription: z.string(),
    contactPageImage: imageSchema.nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    locale: z.string(),
    seo: z.object({
        metaTitle: z.string().nullable().optional(),
        metaDescription: z.string().nullable().optional(),
        canonicalURL: z.string().nullable().optional(),
        keywords: z.string().nullable().optional(),
    })
})

export const contactPageResponseSchema = z.object({
    data: contactPageSchema,
    meta: z.object({})
})

export type ContactPageData = z.infer<typeof contactPageSchema>
export type ContactPageResponse = z.infer<typeof contactPageResponseSchema>