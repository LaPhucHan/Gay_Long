# ==========================================
# STAGE 1: Dependencies - Cài đặt node_modules
# ==========================================
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy các file quản lý gói phụ thuộc
COPY package.json package-lock.json* ./
RUN npm ci

# ==========================================
# STAGE 2: Builder - Build dự án Next.js
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Khai báo môi trường build (Dùng dấu = để chuẩn hóa syntax)
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ==========================================
# STAGE 3: Runner - Container chạy ứng dụng
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Tạo user không phải root để tăng tính bảo mật
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy thư mục public
COPY --from=builder /app/public ./public

# Copy kết quả build Standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]