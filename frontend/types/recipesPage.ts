import { z } from 'zod'
import { imageSchema } from './global'

export const recipePageSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    recipePageTitle: z.string(),
    recipePageDescription: z.string(),
    recipePageImage: imageSchema.nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    locale: z.string(),
})

export const recipePageResponseSchema = z.object({
    data: recipePageSchema,
    meta: z.object({})
})

export type RecipePageData = z.infer<typeof recipePageSchema>
export type RecipePageResponse = z.infer<typeof recipePageResponseSchema>