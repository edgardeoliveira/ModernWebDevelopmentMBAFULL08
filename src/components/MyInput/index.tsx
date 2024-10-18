import './index.scss'

type Props = {
    id: string,
    label: string,
    value?: string,
    type?: React.HTMLInputTypeAttribute,
    change?: (value: string) => void
}

export default function MyInput(props: Props) {
    return (
        <div className="my-input">
            <label htmlFor={props.id}>{props.label}:</label>
            <input
                id={props.id}
                disabled={!props.change}
                value={props.value}
                onChange={e => props.change!(e.target.value) }
                type={props.type === undefined ? "text" : props.type}
            />
        </div>
    )
}