import React, { createContext, useState, useContext, ReactNode } from "react"
import { Client, Project, Task, Payment, Message } from "../types/firestoreSchemas"

type ClientContextType = {
  client: Client | null
  setClient: (client: Client) => void
  projects: Project[]
  setProjects: (projects: Project[]) => void
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
  payments: Payment[]
  setPayments: (payments: Payment[]) => void
  messages: Message[]
  setMessages: (messages: Message[]) => void
}

const ClientContext = createContext<ClientContextType | null>(null)

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])
  const [payments, setPayments] = useState<Payment[]>([])
  const [messages, setMessages] = useState<Message[]>([])

  return (
    <ClientContext.Provider value={{ client, setClient, projects, setProjects, tasks, setTasks, payments, setPayments, messages, setMessages }}>
      {children}
    </ClientContext.Provider>
  )
}

export const useClient = (): ClientContextType => {
  const context = useContext(ClientContext)
  if (context === null) {
    throw new Error("useClient must be used within a ClientProvider")
  }
  return context
}
