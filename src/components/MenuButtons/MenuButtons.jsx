import css from './MenuButtons.module.css'

export default function MenuButtons({ handleStart, handleOptions }) {
    return (
        <ul className={css.list}>
          <li className={css.item}><button className={css.button} type="button" onClick={handleStart}>START GAME</button></li>
          <li className={css.item}><button className={css.button} type="button" onClick={handleOptions}>OPTIONS</button></li>
        </ul>
    )
}