# Auth Module — Backend

## Overview
Two auth flows: OTP-based for customers (phone → SMS OTP), credential-based for staff (email + password).

## Endpoints
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/v1/auth/send-otp` | None | Send OTP to phone |
| POST | `/api/v1/auth/verify-otp` | None | Verify OTP, issue JWT |
| POST | `/api/v1/auth/staff-login` | None | Email/password login |
| POST | `/api/v1/auth/refresh` | Cookie | Refresh access token |
| POST | `/api/v1/auth/logout` | Cookie | Clear refresh token |

## OTP Flow
1. `POST /send-otp` — validate phone, generate 6-digit OTP
2. Store in Redis: `SET otp:{phone} {otp} EX 300` (5 min TTL)
3. Store attempt counter: `SET otp_attempts:{phone} 0 EX 300`
4. Queue SMS via Bull notificationQueue
5. `POST /verify-otp` — fetch from Redis, compare
6. On match: delete Redis keys, upsert User (create if new), issue tokens
7. On mismatch: increment attempts; if attempts >= 3, lock for 15min

## JWT Structure
```json
// Access token payload
{
  "sub": "user-uuid",
  "role": "CUSTOMER",
  "name": "Rahul Sharma",
  "iat": 1234567890,
  "exp": 1234568790  // +15 min
}
```

## Token Storage
- Access token: returned in response body → stored in memory (Zustand) on frontend
- Refresh token: httpOnly, Secure, SameSite=Strict cookie
- Cookie name: `refresh_token`

## Middleware

### `requireAuth`
```ts
// Reads Authorization: Bearer <token>
// Verifies JWT signature + expiry
// Attaches decoded payload to req.user
// Returns 401 if missing or invalid
```

### `requireRole(...roles: UserRole[])`
```ts
// Checks req.user.role is in roles array
// Returns 403 if not authorized
// Always comes AFTER requireAuth
```

## Rate Limiting on Auth Routes
- `send-otp`: 3 requests per phone per 10 minutes (Redis counter)
- `staff-login`: 5 attempts per IP per 15 minutes (express-rate-limit)

## Security Notes
- Passwords hashed with bcrypt, saltRounds: 12
- JWT secrets minimum 32 characters, rotated quarterly
- OTPs never logged in application logs
- Refresh tokens not stored in DB (stateless) — expiry enforced by JWT exp
- On password change: all existing refresh tokens invalidated (issue new JWT with new `iat`)
