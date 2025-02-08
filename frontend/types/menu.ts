import { z } from 'zod'
import { imageSchema } from './global'

export const DietaryTagSchema = z.object({
    id: z.number(),
    type: z.string(),
    name: z.string(),
    description: z.string()
})

// Using recursive type for circular reference
export const DishSchema: z.ZodType<any> = z.lazy(() => z.object({
    id: z.number(),
    dishTitle: z.string(),
    dishPrice: z.number(),
    dishDescription: z.string(),
    dishImage: imageSchema,
    category: z.object({
        data: DishCategorySchema
    }),
    dietaryTags: z.object({
        data: z.array(DietaryTagSchema)
    })
}))

export const DishCategorySchema = z.object({
    id: z.number(),
    dishCategoryTitle: z.string(),
    dishCategoryDescription: z.string(),
    dishes: z.object({
        data: z.array(DishSchema)
    })
})

// Export types derived from schemas
export type DishCategory = z.infer<typeof DishCategorySchema>
export type Dish = z.infer<typeof DishSchema>
export type DietaryTag = z.infer<typeof DietaryTagSchema>