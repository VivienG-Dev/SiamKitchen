import { z } from 'zod'

const imageFormatSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const recipeImageSchema = z.object({
    alternativeText: z.string().nullable().optional(),
    formats: z.object({
        large: imageFormatSchema.optional(),
        medium: imageFormatSchema.optional(),
        small: imageFormatSchema.optional(),
        thumbnail: imageFormatSchema.optional()
    }),
    url: z.string()
})

export const recipeSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    recipeTitle: z.string(),
    recipeDescription: z.string(),
    recipeContent: z.string(),
    recipeImage: recipeImageSchema,
})

export const recipesResponseSchema = z.object({
    data: z.array(recipeSchema)
})

export const recipeResponseSchema = z.object({
    data: recipeSchema
})

export type Recipe = z.infer<typeof recipeSchema>
export type RecipesResponse = z.infer<typeof recipesResponseSchema>
export type RecipeResponse = z.infer<typeof recipeResponseSchema>