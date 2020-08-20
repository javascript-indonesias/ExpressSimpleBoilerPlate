import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';

// Tips coding garden with CJ
// https://www.youtube.com/watch?v=nCWE6eonL7k
// Batasi 10 request per 30 detik
const rateLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 10,
});

// Turunkan kecepatan response setelah request pertama
// Dalam rentang waktu 30 detik
// Pada endpoint api yang sama
const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 1,
    delayMs: 500,
});

export { rateLimiter, speedLimiter };
