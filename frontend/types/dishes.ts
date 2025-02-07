import { z } from 'zod'

const imageFormatSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const dishImageSchema = z.object({
    alternativeText: z.string().nullable().optional(),
    formats: z.object({
        large: imageFormatSchema.optional(),
        medium: imageFormatSchema.optional(),
        small: imageFormatSchema.optional(),
        thumbnail: imageFormatSchema.optional()
    }),
    url: z.string()
})

export const dishSchema = z.object({
    id: z.number(),
    dishTitle: z.string(),
    dishDescription: z.string(),
    dishPrice: z.number(),
    isFeatured: z.boolean(),
    dishImage: dishImageSchema
})

export const dishesResponseSchema = z.object({
    data: z.array(dishSchema)
})

export type Dish = z.infer<typeof dishSchema>
export type DishesResponse = z.infer<typeof dishesResponseSchema>