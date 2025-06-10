import { Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({ 
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

export const metadata = {
  title: "Posty",
  description: "Hanif As の Posty",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
