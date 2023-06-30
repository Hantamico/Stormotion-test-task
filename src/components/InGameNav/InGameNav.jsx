import css from './InGameNav.module.css'

export default function InGameNav({onRestart, onStop}) {
    return (
        <ul className={css.list}>
            <li><button className={css.button} type='button' onClick={onStop}>⏹️</button></li>
            <li><button className={css.button} type='button' onClick={onRestart}>🔄</button></li>
        </ul>
    )
}