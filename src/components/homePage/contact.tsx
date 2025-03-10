// "use client";
// import React, { useState } from "react";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "@/app/firebase/config";
// import { toast } from "sonner";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";

// const ContactPage = () => {

//   const [form, setForm] = useState({ name: "", email: "", phone: "", description: "" });

//   const userId = "F4DXnuFmS5XN6RQ69UwddqKfsgE3"

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.phone || !form.description) {
//       toast.error("Please fill in all fields.");
//       return;
//     }

//     try {
//       const docRef = doc(db, "retailers", userId);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         const existingMessages = docSnap.data().messages || [];
//         const updatedMessages = [...existingMessages, form];

//         await updateDoc(docRef, { messages: updatedMessages });
//         toast.success(" Message sent successfully!")
//         setForm({ name: "", email: "", phone: "", description: "" });
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };
  
//   return (
//     <div className="max-w-7xl   py-16 px-6">
//       <h2 className="volkhov-bold  text-5xl md:text-6xl font-bold text-center text-[#5c4b36] mb-10">
//         Contact Us?
//       </h2>
//           {/* 📞 Contact */}
//           <div className="w-[80vw] max-w-[330px] sm:max-w-3xl mx-auto bg-[#f3f1ed] rounded-2xl p-6 sm:p-10 shadow-md hover:shadow-lg transition">
//           <h3 className="text-2xl font-medium text-[#5c4b36] mb-4">
//             Send a Message
//           </h3>
//           <form onSubmit={handleSubmit} className="space-y-4 z-30">
//             <Input
//               type="text"
//               placeholder="Name"
//               className="w-full p-3 rounded-md border border-[#c4a16c] focus:outline-none focus:ring-2 focus:ring-[#a8845b]"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//             />
//             <Input
//               type="email"
//               placeholder="Email"
//               className="w-full p-3 rounded-md border border-[#c4a16c] focus:outline-none focus:ring-2 focus:ring-[#a8845b]"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//             />
//             <Input
//               type="tel"
//               placeholder="Phone Number"
//               className="w-full p-3 rounded-md border border-[#c4a16c] focus:outline-none focus:ring-2 focus:ring-[#a8845b]"
//               value={form.phone}
//               onChange={(e) => setForm({ ...form, phone: e.target.value })}
//             />
//             <Textarea
//               placeholder="Your Message"
//               className="w-full p-3 rounded-md border border-[#c4a16c] focus:outline-none focus:ring-2 focus:ring-[#a8845b] h-32"
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//             />
//             <button
//               type="submit"
//               className="w-full bg-[#c4a16c] text-white py-3 rounded-md hover:bg-[#a8845b] transition"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//     </div>
//   );
// };

// export default ContactPage;
