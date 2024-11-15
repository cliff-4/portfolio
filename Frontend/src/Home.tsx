import { useEffect, useState } from "react";
import aboutJsonLocal from "../data/about.json";

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

interface AboutInfo {
    about: string;
    image: string;
}

interface ImogeProps {
    image?: string;
    className?: string;
}

const Imoge = ({ image, className }: ImogeProps) => {
    return (
        <div className={className}>
            <img
                className="
            w-full h-full
            bg-cover bg-bottom
            bg-clip-content
            rounded-lg
            object-cover overflow-clip
            "
                src={image}
                alt=""
            />
        </div>
    );
};

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
            } catch (e) {
                console.log("An error occured while loading About... :(");
                console.log(e);
            }
        };

        fetchAbout();
    }, []);

    return (
        <div className="w-full h-full flex flex-col lg:flex-row overflow-scroll p-2 gap-2 pb-24">
            <div className="w-full lg:w-1/2 lg:h-full flex flex-col gap-2">
                <h1 className="animate-pulse text-theme6 font-mono flex-none">
                    Who_Am_I_?
                </h1>
                <Imoge image={image} className="lg:absolute lg:hidden" />
                <span className="lg:max-h-[30rem]">
                    <p
                        className="
                            lg:max-h-full
                            block
                                p-5
                                text-justify
                                text-xl
                                rounded-lg
                                border-4 border-theme6
                                lg:overflow-y-auto box-border
                            "
                    >
                        {about}
                    </p>
                </span>
            </div>
            <Imoge
                image={image}
                className="hidden lg:block w-1/2 h-full flex-col justify-center"
            />
        </div>
    );
}
