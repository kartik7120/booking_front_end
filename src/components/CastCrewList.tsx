interface CastCrewListProps {
    cast_crew: {
        name: string,
        character_name: string,
        photourl: string
    }[]
}

export default function CastCrewList(props: CastCrewListProps) {
    return (
        <div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Cast</h2>
                <div className="flex flex-row items-center justify-start gap-x-4 mb-4 flex-wrap">
                    {
                        props.cast_crew.map((item, index) => {

                            if (item.character_name === "Director" || item.character_name === "Producer" || item.character_name === "Writer" || item.character_name === "Crew") {
                                return null;
                            }

                            return (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-5 mb-4 flex-wrap border border-transparent hover:border-white transition duration-300 rounded-lg p-4 hover:cursor-pointer"
                                >
                                    <div className="avatar">
                                        <div className="w-22 rounded-full hover:ring-primary">
                                            <img src={item.photourl} alt={`${item.name}`} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-bold">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.character_name}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">Crew</h2>
                <div className="flex flex-row items-center justify-start gap-x-4 mb-4 flex-wrap">
                    {
                        props.cast_crew.map((item, index) => {

                            if (item.character_name !== "Director" && item.character_name !== "Producer" && item.character_name !== "Writer" && item.character_name !== "Crew") {
                                return null;
                            }

                            return (
                                <div
                                    key={index}
                                    className="flex flex-row items-center gap-4 mb-4 flex-wrap border border-transparent hover:border-white transition duration-300 rounded-lg p-4 hover:cursor-pointer"
                                >
                                    <div className="avatar">
                                        <div className="w-22 rounded-full hover:ring-primary">
                                            <img src={item.photourl} alt={`${item.name}`} />
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="text-lg font-bold">{item.name}</p>
                                        <p className="text-sm text-gray-500">{item.character_name}</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}