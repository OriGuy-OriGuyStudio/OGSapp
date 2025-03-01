// Firestore Database Schema with TypeScript Types
import { Timestamp } from "firebase/firestore"

// 1. Projects Collection
export interface Project {
  id: string
  name: string
  status: "בתהליך אישור" | "בביצוע" | "הושלם"
  stage: "איפיון" | "עיצוב" | "פיתוח"
  progress: number // 0-100
  clientId: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

// 2. Tasks Collection
export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: "open" | "completed"
  createdAt: Timestamp
  updatedAt: Timestamp
}

// 3. Messages Collection
export interface Message {
  id: string
  projectId: string
  senderId: string
  content: string
  attachments: string[] // URLs
  createdAt: Timestamp
}

// 4. Payments Collection (Tracking Only)
export interface Payment {
  id: string
  projectId: string
  clientId: string
  depositAmount: number
  despositStatus: "ממתין לתשלום" | "שולם" | "באיחור"
  despostDueDate: Timestamp
  despositInvoiceUrl: string
  fullfillAmount: number
  fullfillStatus: "ממתין לתשלום" | "שולם" | "באיחור"
  fullfillDueDate: Timestamp
  fullfillInvoiceUrl: string
  totalPay: number
  createdAt: Timestamp
}

// 5. Clients Collection
export interface Client {
  id: string
  name: string
  email: string
  phone: string
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type FirestoreSchemaTypes = Project | Task | Message | Payment | Client
