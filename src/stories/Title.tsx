export interface TitleProps {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <div className="w-full h-full text-8xl max-2xl:text-6xl font-extrabold max-xl:text-2xl max-lg:text-xl max-sm:text-base line-clamp-1">
            {props.title}
        </div>
    )
}
