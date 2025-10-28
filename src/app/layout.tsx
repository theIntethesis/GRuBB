import type { Metadata } from "next";

import "@/styles/globals.css";
import SetupContext from "@/lib/context";
import Header from "./header";

export const metadata: Metadata = {
  title: "GRuBB",
  description: "",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017')



    return <html lang="en">
        <SetupContext>
            <body>
                <Header/>

                {children}
            </body>
        </SetupContext>

    </html>
}
