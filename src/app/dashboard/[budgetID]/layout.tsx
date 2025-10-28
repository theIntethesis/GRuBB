import type { Metadata } from "next";

import "@/styles/globals.css";
import Header from "./header";


export default function RootLayout({children}: Readonly<{ children: React.ReactNode; }>) {


    return <body>
        <Header/>

        {children}
    </body>

}
