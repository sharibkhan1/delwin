// userService.ts
import { db } from "@/app/firebase/config";
import { doc, getDoc } from 'firebase/firestore';

export const fetchUserDataa = async (userId: string) => {
  if (!userId) return null;

  try {
    const retailerDocRef = doc(db, "retailers", userId);
    const retailerDoc = await getDoc(retailerDocRef);

    if (retailerDoc.exists()) {
      return retailerDoc.data();
    } else {
      console.error("No such retailer document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};