import css from "./PickButtons.module.css"

export default function PickButtons({ buttons, onHandleButton }) {
    return (
        <ul className={css.list}>
            {buttons.map(button =>
                <li key={button} >
                    <button className={css.button} name={button} onClick={onHandleButton}>Pick {button} matches</button>
                </li>)}
        </ul>
    )
}