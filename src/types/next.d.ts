import { NextRequest } from 'next/server';

declare module 'next/server' {
  interface NextRequest {
    userId?: string;
  }
}
