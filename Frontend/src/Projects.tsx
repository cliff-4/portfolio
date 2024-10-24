import { useState, useEffect } from "react";
import Window from "./Template";

const BACKEND_BASE_URL: string = import.meta.env.VITE_BACKEND_BASE_URL;
const IMAGE_DIR = import.meta.env.VITE_IMAGE_DIR;

interface projectCard {
    id: number;
    title: string;
    short: string;
    long: string;
    last_update: string;
    image_paths: string[];
}

const ProjectModal: React.FC<{
    currProject: projectCard | null;
    setCurrProject: any;
}> = ({ currProject, setCurrProject }) => {
    let title = "";
    let short = "";
    let long = "";
    let last_update = "";
    let image_paths = [""];
    if (currProject != null) {
        title = currProject.title;
        short = currProject.short;
        long = currProject.long;
        image_paths = currProject.image_paths;
        let rawDate = new Date(currProject.last_update);
        last_update = rawDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    }

    return (
        <div
            onClick={() => setCurrProject(null)}
            className={`
                fixed inset-0 flex justify-center items-center
                transition-colors
                ${currProject != null ? "visible bg-black/40" : "invisible"}
            `}
        >
            <div
                className="
                    flex flex-col gap-2
                    h-3/4 w-3/4
                    p-5
                    rounded-lg
                    bg-theme3

                "
            >
                <span className="w-fit bg-theme4 p-2 rounded-2xl text-3xl font-mono">
                    {title}
                </span>
                <div className="w-full overflow-auto text-justify flex flex-col gap-2 rounded-lg">
                    <p className="p-1 rounded-lg font-mono">{short}</p>
                    <div className="h-min w-full flex flex-row justify-center">
                        <iframe
                            className="aspect-video rounded-lg max-w-[500px] w-full"
                            src="https://www.youtube.com/embed/1Onjx9heU5o?si=2iDFR-tuSwSNpIyk"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                    <p>{long}</p>
                </div>
                <div className="w-full text-right">
                    <span className="bg-theme4 p-1 rounded-lg text-sm font-mono">
                        Last edited: {last_update}
                    </span>
                </div>
            </div>
        </div>
    );
};

const ProjectLine: React.FC<{ project: projectCard; setCurrProject: any }> = ({
    project,
    setCurrProject,
}) => {
    const lastUpdateDate = new Date(project.last_update);
    const formattedDate = lastUpdateDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
    return (
        <div
            className="
                p-3
                group hover:cursor-pointer
                bg-theme4 rounded-lg
                shadow-sm hover:shadow-lg
                hover:scale-110
                transition-all
                flex flex-col
            "
            onClick={() => setCurrProject(project)}
        >
            <img
                className="object-cover h-48 w-96 rounded-lg"
                src={`${IMAGE_DIR}/${
                    project.image_paths.length == 0
                        ? "default.jpg"
                        : project.image_paths[0]
                }`}
                alt={project.title}
            />
            <p className="break-all flex flex-col">
                <span className="font-mono">{project.title}</span>
                <span className="text-right">
                    <i className="right-0 text-sm">{formattedDate}</i>
                </span>
            </p>
        </div>
    );
};

const Projects = () => {
    const [projects, setProjects] = useState<projectCard[]>([]);
    const [currProject, setCurrProject] = useState<projectCard | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch(`${BACKEND_BASE_URL}/projects`);
                const rawProjects = (await response.json()) as projectCard[];
                setProjects(rawProjects);
                console.log("Successfully procured Projects!");
            } catch (e: any) {
                console.error(e);
            }
        };
        fetchProjects();
    }, []);

    return (
        <>
            <Window>
                <div className="flex flex-col h-full w-full">
                    <h1 className="flex-none font-mono text-theme6">
                        Projects!
                    </h1>
                    <div
                        className="
                    flex-1 overflow-y-auto overflow-x-clip
                    mt-2 mb-10 p-5
                    bg-theme5 rounded-lg
                    grid grid-cols-4 grid-flow-row gap-5
                    "
                    >
                        {projects.map((project, index) => (
                            <ProjectLine
                                key={index}
                                project={project}
                                setCurrProject={setCurrProject}
                            />
                        ))}
                    </div>
                </div>
            </Window>
            <ProjectModal
                currProject={currProject}
                setCurrProject={setCurrProject}
            />
        </>
    );
};

export default Projects;
