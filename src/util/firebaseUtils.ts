import { FirebaseError } from "firebase/app"

export const handleFirebaseError = (error: FirebaseError) => {
  switch (error.code) {
    case "auth/invalid-email":
      return "כתובת האימייל אינה חוקית."
    case "auth/user-disabled":
      return "המשתמש הושבת."
    case "auth/user-not-found":
      return "המשתמש לא נמצא."
    case "auth/wrong-password":
      return "הסיסמא שגויה."
    case "auth/network-request-failed":
      return "שגיאת רשת. בדוק את חיבור האינטרנט שלך."
    case "auth/invalid-credential":
      return "אימייל או סיסמא לא תקינים, נסה שוב"
    default:
      return "שגיאה לא ידועה. נסה שוב מאוחר יותר."
  }
}
