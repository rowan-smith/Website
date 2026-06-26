import { z } from 'zod';

const experienceItemSchema = z.object({
  title: z.string().min(1),
  company: z.string().min(1),
  period: z.string().min(1),
  location: z.string().optional(),
  bullets: z.array(z.string().min(1)),
});

const educationItemSchema = z.object({
  degree: z.string().min(1),
  school: z.string().min(1),
  location: z.string().min(1),
  period: z.string().min(1),
});

const leadershipItemSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  period: z.string().min(1),
  bullets: z.array(z.string().min(1)),
});

const resumeDataSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  location: z.string().min(1),
  github: z.url(),
  linkedin: z.url(),
  about: z.string().min(1),
  profileImage: z.string().min(1).optional(),
  experience: z.array(experienceItemSchema),
  education: z.array(educationItemSchema),
  leadership: z.array(leadershipItemSchema).optional(),
  skills: z.record(z.string(), z.array(z.string().min(1))),
});

const homeStatSchema = z
  .object({
    label: z.string().min(1),
    value: z.string().min(1).optional(),
    derive: z.enum(['experienceCount', 'projectCount', 'technologyCount']).optional(),
  })
  .refine((stat) => Boolean(stat.value || stat.derive), {
    message: 'Each home stat must include a value or derive key',
  });

const homeDataSchema = z.object({
  resumeCardDescription: z.string().min(1),
  projectsCardDescription: z.string().min(1),
  resumeCardChips: z.array(z.string().min(1)),
  stats: z.array(homeStatSchema).min(1),
});

const siteProjectSchema = z.object({
  name: z.string().min(1),
  emoji: z.string().min(1),
  status: z.enum(['active', 'completed', 'maintenance', 'wip']),
  description: z.string().min(1),
  tech: z.array(z.string().min(1)),
  keywords: z.array(z.string().min(1)),
  githubLink: z.url().optional(),
  websiteLink: z.url().optional(),
  highlightOnResume: z.boolean().optional(),
});

export const siteDataSchema = z.object({
  resume: resumeDataSchema,
  home: homeDataSchema,
  funProjects: z.array(siteProjectSchema),
});
