import Header from "@/app/_components/Header"
import "@/app/_styles/globals.css";
import {Josefin_Sans} from "next/font/google";

export const metadata={
  title:{
    template:"%s | The Wild Oasis",
    default:"Welcome / The Wild Oasis"
  },
  description:"The Wild Oasis is a luxury cabin rental service offering unique and unforgettable experiences in nature.",
  
}
const josefin=Josefin_Sans({
  subsets:["latin"],
  display:"swap",
})



export default function RootLayout({children}) {
   return(
     <html lang="en">
         <body className={` ${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}>
           <header >
           <Header/>
           </header>
           <div className="flex-1 px-8 py-12 grid">
           <main className="max-w-7xl  mx-auto w-full">
            {children}
           </main>
          </div>
         </body>
     </html>
   )
}