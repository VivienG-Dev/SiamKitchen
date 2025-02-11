import { z } from 'zod'
import { imageSchema } from './global'

const menuPageImageSchema = z.array(imageSchema)

export const menuPageSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    menuPageTitle: z.string(),
    menuPageDescription: z.string(),
    menuPageImage: menuPageImageSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    locale: z.string(),
})

export const menuPageResponseSchema = z.object({
    data: menuPageSchema,
    meta: z.object({})
})

export type MenuPageData = z.infer<typeof menuPageSchema>
export type MenuPageResponse = z.infer<typeof menuPageResponseSchema>