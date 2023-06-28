export default function Information({totalMatches, playerMatches, botMatches, leftMatches}) {
    return (
        <ul className="information">
            <li>matches total:{totalMatches}</li> 
            <li>matches left:{ leftMatches} </li>
            <li>Your matches: {playerMatches }</li>
            <li>Bot matches: {botMatches }</li>
      </ul>
    )
}