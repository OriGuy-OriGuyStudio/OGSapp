import React, { createContext, useContext, useState } from "react"
import { FirebaseAuthTypes } from "@react-native-firebase/auth"

interface AuthContextType {
  confirm: FirebaseAuthTypes.ConfirmationResult | null
  setConfirm: (confirm: FirebaseAuthTypes.ConfirmationResult | null) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult | null>(null)

  return (
    <AuthContext.Provider value={{ confirm, setConfirm }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within an AuthProvider")
  return context
}
