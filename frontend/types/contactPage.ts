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
})

export const contactPageResponseSchema = z.object({
    data: contactPageSchema,
    meta: z.object({})
})

export type ContactPageData = z.infer<typeof contactPageSchema>
export type ContactPageResponse = z.infer<typeof contactPageResponseSchema>