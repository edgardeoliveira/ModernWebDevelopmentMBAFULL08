import './styles.scss'

type Props = {
    text: string,
    click: () => void
}

export default function HeaderButton({ text, click }: Props) {
    return (
        <button className="header-button" onClick={click}>{text}</button>
    )
}