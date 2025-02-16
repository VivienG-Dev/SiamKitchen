import { z } from 'zod'

const imageFormatSchema = z.object({
    url: z.string(),
    width: z.number(),
    height: z.number()
})

const aboutPageImageSchema = z.object({
    alternativeText: z.string().nullable().optional(),
    formats: z.object({
        large: imageFormatSchema.optional(),
        medium: imageFormatSchema.optional(),
        small: imageFormatSchema.optional(),
        thumbnail: imageFormatSchema.optional()
    }),
    url: z.string()
})

const aboutBlockSchema = z.object({
    id: z.number(),
    aboutBlockTitle: z.string(),
    aboutBlockDescription: z.string(),
    aboutBlockOrder: z.number(),
    aboutBlockImage: aboutPageImageSchema,
    aboutBlockYear: z.string().nullable().optional()
})

const teamMemberSchema = z.object({
    id: z.number(),
    teamName: z.string(),
    teamDescription: z.string(),
    teamRole: z.string(),
    teamImage: aboutPageImageSchema
})

export const aboutResponseSchema = z.object({
    data: z.object({
        id: z.number(),
        documentId: z.string(),
        aboutPageTitle: z.string(),
        aboutPageDescription: z.string(),
        About: z.array(aboutBlockSchema),
        Team: z.array(teamMemberSchema),
        aboutPageImage: aboutPageImageSchema,
        seo: z.object({
            metaTitle: z.string().nullable().optional(),
            metaDescription: z.string().nullable().optional(),
            canonicalURL: z.string().nullable().optional(),
            keywords: z.string().nullable().optional(),
            ogUrl: z.string().nullable().optional(),
        })
    }),
    meta: z.object({})
})

export type AboutResponse = z.infer<typeof aboutResponseSchema>