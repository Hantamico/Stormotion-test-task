import { useEffect, useState } from "react"
import Information from "./Information/Information";
import Container from "./Container/Container";
import PickButtons from "./PickButtons/PickButtons";

const players = {
  human: "HUMAN",
  bot: "BOT",
};

export default function App() {
  //необхідні стейти
  const [totalMatches, setTotalMatches] = useState(25);//всього сірників
  const [playerMatches, setPlayerMatches] = useState(0);//сірники гравця 
  const [botMatches, setBotMatches] = useState(0);//сірники бота
  const [leftMatches, setLeftmatches] = useState(25);// залишок сірників
  const [totalButtons, setTotalButtons] = useState(3);//кількість кнопок вибору
  const [currentPlyer, setCurrentPlayer] = useState(players.human);//вибір гравця


  const buttons = []

  for (let i = 1; i <= totalButtons; i++){
    buttons.push(i)
  }
  
  //useEffect слідкує за leftMatches 
  useEffect(() => { 
    //якщо сірників не залишилось то гра закінчується і обирається переможець
    if (leftMatches <= 0) {
      chooseWinner();
      return
    }

    if (leftMatches >= 0 && currentPlyer === players.bot) {
    //ход бота
    setTimeout(()=>{botTurn();},2000)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftMatches])

  //обробка натискання на кнопку
  function onHandleButton(e) {
    
    const choose = Number(e.target.name);
    console.log(leftMatches === 0 && choose >= leftMatches)
    if (leftMatches === 0 && choose >= leftMatches) {
      return alert(`You can't take that many matches. There is only ${leftMatches} in the deck.`)
    }
    ;
    //зміна стейту с сірниками гравця 
    setPlayerMatches(v => v + choose);
    setLeftmatches(v => v - choose);
    setCurrentPlayer(players.bot);
  };

  // функція яка буде займатись обробкою того хто переміг
  function chooseWinner() {
    if (playerMatches % 2 === 0) {
      alert("Game Over! You Win");
    };
    alert("Game Over! You Loose")
  };

  //Функція яка буде розраховувати ход бота 
  function botTurn() {
    console.log("Bots turn!");

   //Перевірка чи може бот взяти сірник з колоди
    if (leftMatches !== 0) {
       //Якщо кількість сірників в колоді не парна то бот бере 2 сірника
      if (leftMatches % 2 !== 0) {

        if (leftMatches === 1) {
          //Якщо в колоді 1 cірник то візьме всього 1 
          setBotMatches(v => v + 1);
          setLeftmatches(v => v - 1);
        } else {
        setBotMatches(v => v + 2);
        setLeftmatches(v => v - 2);
        }
      }
      if (leftMatches % 2 === 0) { //Якщо кількість сірників в колоді парна то бот бере будь яку непарну кількість сірників
          setBotMatches(v => v + 3);
          setLeftmatches(v => v - 3);
      };
      setCurrentPlayer(players.human);
    };
  };

  
  //рендер розмітки
  return (
    // рендеримо компонент Container 
    <Container>
      {/* //рендеримо компонент Information  */}
      <Information totalMatches={totalMatches} playerMatches={playerMatches} botMatches={botMatches} leftMatches={leftMatches } />
      {/* рендеримо компонент PickButtons  */}
      {currentPlyer === players.human ?
        (<PickButtons buttons={buttons} onHandleButton={onHandleButton} />) : (<p>Bot Turn</p>)}
      
    </Container>
  );
}
  
