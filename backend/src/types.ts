import { z } from "zod";

export const PrioritySchema = z.enum(["high", "medium", "low"]);

export const RecommendationSchema = z.object({
  priority: PrioritySchema,
  category: z.string(),
  title: z.string(),
  why: z.string(),
  before: z.string().nullable().optional(),
  after: z.string(),
});

export const AnalysisSchema = z.object({
  candidateName: z.string().nullable().optional(),
  jobTitle: z.string(),
  matchScore: z.number().min(0).max(100),
  verdict: z.string(),
  summary: z.string(),
  scoreBreakdown: z.object({
    skills: z.number().min(0).max(100),
    experience: z.number().min(0).max(100),
    keywords: z.number().min(0).max(100),
    impact: z.number().min(0).max(100),
    clarity: z.number().min(0).max(100),
  }),
  keywords: z.object({
    matched: z.array(z.string()),
    missing: z.array(z.string()),
  }),
  strengths: z.array(z.string()),
  gaps: z.array(z.string()),
  recommendations: z.array(RecommendationSchema),
  rewrittenSummary: z.string(),
});

export type Priority = z.infer<typeof PrioritySchema>;
export type Recommendation = z.infer<typeof RecommendationSchema>;
export type Analysis = z.infer<typeof AnalysisSchema>;
