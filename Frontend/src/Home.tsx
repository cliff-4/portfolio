import { useEffect, useState } from "react";
import Window from "./Template";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

export default function Home() {
    const [about, setAbout] = useState<string>();

    useEffect(() => {
        const fetchAbout = async () => {
            setAbout("Loading...");

            try {
                const response = await fetch(`${BACKEND_BASE_URL}/about`);
                const aboutSTRING = (await response.json()) as string;
                setAbout(aboutSTRING);
                console.log("Successfully procured About!");
            } catch (e: any) {
                setAbout("An error occured while loading About... :(");
                console.log(e);
            }
        };

        fetchAbout();
    }, []);

    return (
        <Window>
            <div className="w-1/2 h-full flex flex-col">
                <h1 className="animate-pulse text-theme6 font-mono flex-none">
                    Who_Am_I_?
                </h1>
                <span className="flex-1 flex items-center">
                    <p
                        className="
                            p-5
                            text-justify
                            text-xl
                            rounded-lg
                            border-4 border-theme6
                        "
                    >
                        {about}
                    </p>
                </span>
            </div>
            <div
                className="
                    w-1/2 h-full
                    bg-cover bg-bottom
                    bg-clip-content
                    bg-bungee
                    rounded-lg

                    "
            ></div>
        </Window>
    );
}
