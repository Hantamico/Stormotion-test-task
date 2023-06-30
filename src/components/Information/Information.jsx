import css from "./Information.module.css"

export default function Information({ totalMatches, playerMatches, botMatches, leftMatches }) {
    return (
        <ul className={css.list}>
            <li><span>matches total:</span><p>{totalMatches}</p></li> 
            <li><span>matches left:</span><p>{ leftMatches}</p></li>
            <li><span>Your matches:</span><p>{playerMatches }</p></li>
            <li><span>Bot matches:</span><p>{botMatches }</p></li>
      </ul>
    )
}