export default function PickButtons({buttons, onHandleButton}) {
    return (
        <ul className="list">
            {buttons.map(button => <li key={button} ><button name={button} onClick={onHandleButton}>Pick {button} matches</button></li>)}
        </ul>
    )
}