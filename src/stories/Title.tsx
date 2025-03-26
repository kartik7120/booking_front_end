export interface TitleProps {
    title: string
}

export default function Title(props: TitleProps) {
    return (
        <div className='text-6xl font-extrabold'>{props.title}</div>
    )
}
