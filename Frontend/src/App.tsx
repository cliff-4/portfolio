import { useEffect, useState } from "react";

const BACKEND_BASE_URL = "http://127.0.0.1:8000";

interface aboutInterface {
    about: string;
    image: any;
}

export default function App() {
    const [about, setAbout] = useState<string>();
    const [image, setImage] = useState<string>();

    useEffect(() => {
        const fetchAbout = async () => {
            setAbout("Loading...");

            try {
                const response = await fetch(`${BACKEND_BASE_URL}/about`);
                const aboutJSON = (await response.json()) as aboutInterface;
                setAbout(aboutJSON.about);
                setImage(aboutJSON.image);
                console.log("Successfully procured About!");
            } catch (e: any) {
                setAbout("An error occured while loading About... :(");
                console.log(e);
            }
        };

        fetchAbout();
    }, []);

    return (
        <div className="flex items-center justify-center h-screen w-screen bg-theme5 p-5">
            <div
                className="
                    w-full h-full p-5
                    bg-theme6 rounded-lg shadow-lg
                    flex items-center justify-center space-x-5
                "
            >
                <div className="w-1/2 h-full">
                    <h1 className="animate-pulse text-theme3">WhoAmI?</h1>
                    <p className="text-justify">{about}</p>
                </div>
                <div
                    className={`
                        w-1/2 h-full
                        bg-cover bg-center
                        bg-[url('/img/${image}')]
                        rounded-lg
                    `}
                ></div>
            </div>
        </div>
    );
}
