import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore"
import { db } from "../config/firebaseConfig"
import {
  Client,
  Message,
  Payment,
  Project,
  Task,
} from "../types/firestoreSchemas"
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
//addNewClient, addNewProject, addNewTask, addNewMessage, addNewPayment
export async function addNewClient(
  client: Omit<Client, "id" | "createdAt" | "updatedAt">
) {
  try {
    const docRef = await addDoc(collection(db, "clients"), {
      ...client,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}
export async function addNewProject(
  project: Omit<Project, "id" | "createdAt" | "updatedAt">
) {
  try {
    const docRef = await addDoc(collection(db, "projects"), {
      ...project,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}
export async function addNewTask(
  task: Omit<Task, "id" | "createdAt" | "updatedAt">
) {
  try {
    const docRef = await addDoc(collection(db, "tasks"), {
      ...task,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}
export async function addNewMessage(
  message: Omit<Message, "id" | "createdAt">
) {
  try {
    const docRef = await addDoc(collection(db, "messages"), {
      ...message,
      createdAt: serverTimestamp(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}
export async function addNewPayment(
  payment: Omit<Payment, "id" | "createdAt">
) {
  try {
    const docRef = await addDoc(collection(db, "payments"), {
      ...payment,
      createdAt: serverTimestamp(),
    })
    console.log("Document written with ID: ", docRef.id)
  } catch (error) {
    console.error("Error adding document: ", error)
  }
}

//deleteClient, deleteProject, deleteTask, deleteMessage, deletePayment
export async function deleteClient(clientId: string) {
  try {
    await deleteDoc(doc(db, `clients/${clientId}`))
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error removing document: ", error)
  }
}
export async function deleteProject(projectId: string) {
  try {
    await deleteDoc(doc(db, `projects/${projectId}`))
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error removing document: ", error)
  }
}
export async function deleteTask(taskId: string) {
  try {
    await deleteDoc(doc(db, `tasks/${taskId}`))
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error removing document: ", error)
  }
}
export async function deleteMessage(messageId: string) {
  try {
    await deleteDoc(doc(db, `messages/${messageId}`))
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error removing document: ", error)
  }
}
export async function deletePayment(paymentId: string) {
  try {
    await deleteDoc(doc(db, `payments/${paymentId}`))
    console.log("Document successfully deleted!")
  } catch (error) {
    console.error("Error removing document: ", error)
  }
}
//getClients, getProjects, getTasks, getMessages, getPayments
export async function getClients() {
  try {
    const querySnapshot = await getDocs(collection(db, "clients"))
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Client),
    } as { size: number; data: Client[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getProjects() {
  try {
    const querySnapshot = await getDocs(collection(db, "projects"))
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Project),
    } as { size: number; data: Project[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getTasks() {
  try {
    const querySnapshot = await getDocs(collection(db, "tasks"))
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Task),
    } as { size: number; data: Task[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getMessages() {
  try {
    const querySnapshot = await getDocs(collection(db, "messages"))
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Message),
    } as { size: number; data: Message[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getPayments() {
  try {
    const querySnapshot = await getDocs(collection(db, "payments"))
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Payment),
    } as { size: number; data: Payment[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
//getProjectById, getTasksByProjectId, getMessagesByProjectId, getPaymentsByProjectId, getClientById
export async function getClientById(clientId: string) {
  try {
    const docRef = doc(db, `clients/${clientId}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as Client
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}
export async function getProjectById(projectId: string) {
  try {
    const docRef = doc(db, `projects/${projectId}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as Project
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}
export async function getTasksByProjectId(projectId: string) {
  try {
    const q = query(
      collection(db, "tasks"),
      where("projectId", "==", projectId)
    )
    const querySnapshot = await getDocs(q)
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Task),
    } as { size: number; data: Task[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getTaskById(taskId: string) {
  try {
    const docRef = doc(db, `tasks/${taskId}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as Task
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}
export async function getMessagesByProjectId(projectId: string) {
  try {
    const q = query(
      collection(db, "messages"),
      where("projectId", "==", projectId)
    )
    const querySnapshot = await getDocs(q)
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Message),
    } as { size: number; data: Message[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getMessageById(messageId: string) {
  try {
    const docRef = doc(db, `messages/${messageId}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as Message
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}
export async function getPaymentsByProjectId(projectId: string) {
  try {
    const q = query(
      collection(db, "payments"),
      where("projectId", "==", projectId)
    )
    const querySnapshot = await getDocs(q)
    const data = {
      size: querySnapshot.size,
      data: querySnapshot.docs.map((doc) => doc.data() as Payment),
    } as { size: number; data: Payment[] }
    return data
  } catch (error) {
    console.error("Error getting documents: ", error)
    return { size: 0, data: [] }
  }
}
export async function getPaymentById(paymentId: string) {
  try {
    const docRef = doc(db, `payments/${paymentId}`)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data() as Payment
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!")
    }
  } catch (error) {
    console.error("Error getting document: ", error)
    return null
  }
}
//updateClient, updateProject, updateTask
export async function updateClient(
  clientId: string,
  client: Partial<Omit<Client, "id" | "createdAt" | "updatedAt">>
) {
  try {
    const docRef = doc(db, `clients/${clientId}`)
    await updateDoc(docRef, {
      ...client,
      updatedAt: serverTimestamp(),
    })
    console.log("Document successfully updated!")
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}
export async function updateProject(
  projectId: string,
  project: Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>
) {
  try {
    const docRef = doc(db, `projects/${projectId}`)
    await updateDoc(docRef, {
      ...project,
      updatedAt: serverTimestamp(),
    })
    console.log("Document successfully updated!")
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}
export async function updateTask(
  taskId: string,
  task: Partial<Omit<Task, "id" | "createdAt" | "updatedAt">>
) {
  try {
    const docRef = doc(db, `tasks/${taskId}`)
    await updateDoc(docRef, {
      ...task,
      updatedAt: serverTimestamp(),
    })
    console.log("Document successfully updated!")
  } catch (error) {
    console.error("Error updating document: ", error)
  }
}

export const signInWithPhoneNumber = async (phoneNumber: string): Promise<FirebaseAuthTypes.ConfirmationResult> => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      return confirmation;
    } catch (error) {
      console.error("Error sending verification code:", error);
      throw error;
    }
  };
  
  // אימות הקוד שנשלח
  export const verifyCode = async (confirmation: FirebaseAuthTypes.ConfirmationResult, code: string): Promise<void> => {
    try {
      await confirmation.confirm(code);
      console.log("User signed in successfully!");
    } catch (error) {
      console.error("Invalid verification code:", error);
      throw error;
    }
  };

async function testFirestoreConnection() {
  try {
    const querySnapshot = await getDocs(collection(db, "customers"))
    console.log(`🔹 Firestore connected, Found ${querySnapshot.size} documents`)
  } catch (error) {
    console.error("❌ Connention error to firestire:", error)
  }
}
testFirestoreConnection()
