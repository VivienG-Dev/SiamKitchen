import { z } from 'zod'
import { imageSchema } from './global'

export const menuPageSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    menuPageTitle: z.string(),
    menuPageDescription: z.string(),
    menuPageImage: imageSchema.nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    locale: z.string(),
    seo: z.object({
        metaTitle: z.string().nullable().optional(),
        metaDescription: z.string().nullable().optional(),
        canonicalURL: z.string().nullable().optional(),
        keywords: z.string().nullable().optional(),
        ogUrl: z.string().nullable().optional(),
    })
})

export const menuPageResponseSchema = z.object({
    data: menuPageSchema,
    meta: z.object({})
})

export type MenuPageData = z.infer<typeof menuPageSchema>
export type MenuPageResponse = z.infer<typeof menuPageResponseSchema>