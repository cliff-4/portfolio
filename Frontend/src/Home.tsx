import { useEffect, useState } from "react";
import Window from "./Template";
import aboutJsonLocal from "../data/about.json";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

interface AboutInfo {
    about: string;
    image: string;
}

export default function Home() {
    const [about, setAbout] = useState<string>();
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const fetchAbout = async () => {
            setAbout(aboutJsonLocal.about);
            setImage(aboutJsonLocal.image);
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/about`);
                const aboutJSON = (await response.json()) as AboutInfo;
                setAbout(aboutJSON.about);
                setImage(aboutJSON.image);
                console.log("Successfully procured About!");
            } catch (e: any) {
                console.log("An error occured while loading About... :(");
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
                <span className="max-h-[30rem]">
                    <p
                        className="
                        max-h-full
                        block
                            p-5
                            text-justify
                            text-xl
                            rounded-lg
                            border-4 border-theme6
                            overflow-y-auto box-border
                        "
                    >
                        {about}
                    </p>
                </span>
            </div>
            <img
                className="
                    w-1/2 h-full
                    bg-cover bg-bottom
                    bg-clip-content
                    rounded-lg
                    object-cover
                    "
                src={image}
                alt=""
            />
        </Window>
    );
}
