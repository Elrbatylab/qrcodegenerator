# Deployment Guide

## Prerequisites
1. Vercel Account
2. GitHub Repository
3. Environment Variables Setup

## Environment Variables
Set up the following environment variables in your Vercel project:

1. Authentication:
   - NEXTAUTH_URL: Your production URL
   - NEXTAUTH_SECRET: Generate using `openssl rand -base64 32`

2. Database:
   - POSTGRES_URL: Vercel Postgres connection string
   - POSTGRES_PRISMA_URL: Prisma connection string
   - POSTGRES_URL_NON_POOLING: Non-pooling connection string
   - POSTGRES_USER: Database user
   - POSTGRES_HOST: Database host
   - POSTGRES_PASSWORD: Database password
   - POSTGRES_DATABASE: Database name

3. Storage:
   - BLOB_READ_WRITE_TOKEN: Vercel Blob storage token

4. Analytics:
   - NEXT_PUBLIC_ANALYTICS_ID: Vercel Analytics ID

## Deployment Steps

1. Push your code to GitHub
2. Import your repository to Vercel
3. Configure environment variables
4. Deploy with the following build settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

## Database Migration

Run the following command to set up the database:

```bash
psql $POSTGRES_URL -f schema 