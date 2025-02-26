import React, { createContext, useState, useContext, ReactNode } from "react"
import { Client } from "../types/firestoreSchemas"

type ClientContextType = {
  client: Client | null
  setClient: (client: Client) => void
}

const ClientContext = createContext<ClientContextType | null>(null)

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  const [client, setClient] = useState<Client | null>(null)

  return (
    <ClientContext.Provider value={{ client, setClient }}>
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
