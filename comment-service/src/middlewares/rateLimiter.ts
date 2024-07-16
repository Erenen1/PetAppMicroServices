import { rateLimit } from 'express-rate-limit'

export const authRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 7,
	legacyHeaders: false,
})

export const appRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 150,
	legacyHeaders: false,
})
