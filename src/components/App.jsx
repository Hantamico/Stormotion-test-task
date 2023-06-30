import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Information from "./Information/Information";
import Container from "./Container/Container";
import PickButtons from "./PickButtons/PickButtons";
import MenuButtons from "./MenuButtons/MenuButtons";
import Modal from "./Modal/Modal";
import OptionsForm from "./OptionsForm/OptionsForm";
import InGameNav from "./InGameNav/InGameNav";

const players = {
  human: "HUMAN",
  bot: "BOT",
};

export default function App() {
  //необхідні стейти
  const [totalMatches, setTotalMatches] = useState(25);//всього сірників
  const [playerMatches, setPlayerMatches] = useState(0);//сірники гравця 
  const [botMatches, setBotMatches] = useState(0);//сірники бота
  const [leftMatches, setLeftMatches] = useState(25);// залишок сірників
  const [totalButtons, setTotalButtons] = useState(3);//кількість кнопок вибору
  const [currentPlyer, setCurrentPlayer] = useState(players.human);//вибір гравця
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [options, setOptions] = useState(null);


  const buttons = []

  for (let i = 1; i <= totalButtons; i++){
    buttons.push(i)
  }
  
  //useEffect слідкує за leftMatches 
  useEffect(() => { 
    //якщо сірників не залишилось то гра закінчується і обирається переможець
    if (leftMatches <= 0) {
      chooseWinner();
      setTimeout(() => setIsGameStarted(false), 2000);
      RestartGame();
      return
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftMatches])

  useEffect(() => {
    if (leftMatches >= 0 && currentPlyer === players.bot) {
    //ход бота
    botTurn();
    }
  }, [botTurn, currentPlyer, leftMatches])

  //обробка натискання на кнопку
  function onHandleButton(e) {
    
    const choose = Number(e.target.name);
    console.log(choose > leftMatches);
    if (choose > leftMatches) {
      toast.info(`You can't take that many matches. There is only ${leftMatches} in the deck.`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
      });
      return;
    };
    //зміна стейту с сірниками гравця 
    setPlayerMatches(v => v + choose);
    setLeftMatches(v => v - choose);
    setCurrentPlayer(players.bot);
  };

  function RestartGame() {

    if (!options) {
      setTotalMatches(25);
      setLeftMatches(25);
      setPlayerMatches(0);
      setBotMatches(0);
      setTotalButtons(3);
      setCurrentPlayer(players.human);
    }

    if (options) {
      if (Number(options.totalMatches) === 25) {
        setTotalMatches(25)
      } else {
      setTotalMatches(2 * Number(options.totalMatches) + 1);
      setLeftMatches(2 * Number(options.totalMatches) + 1);
      }
      
      setTotalButtons(Number(options.matchesPerTurn))

    if (options.firstTurn === "bot") {
      console.log("bot pick first")
      setCurrentPlayer(players.bot)
    } else {
      setCurrentPlayer(players.human)
    }
      setPlayerMatches(0);
      setBotMatches(0);
    };
  };

  function StopGame() {
    setIsGameStarted(false)
    RestartGame()
  }

  function handleStart() {
    setIsGameStarted(true);
  }

  function handleOptions() {
   toggleModal();
  }

  function toggleModal(e){
        setShowModal(!showModal);
  }
  
  function formSubmitHandler(data) {
    console.log(data);
    setOptions(data);
    toggleModal()
    if (Number(data.totalMatches) === 25) {
      setTotalMatches(25)
    } else {
      setTotalMatches(2 * Number(data.totalMatches) + 1);
      setLeftMatches(totalMatches);
    }
    setTotalButtons(Number(data.matchesPerTurn))

    if (data.firstTurn === "bot") {
      console.log("bot pick first")
      setCurrentPlayer(players.bot)
    } else {
      setCurrentPlayer(players.human)
    }
  }
  
  // функція яка буде займатись обробкою того хто переміг
  function chooseWinner() {
    if (playerMatches % 2 === 0) {
      toast.success('Game Over! You Win', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
        });
    } else {
      toast.success('Game Over! You Loose', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "light",
        });
    }
  };

  //Функція яка буде розраховувати ход бота 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function botTurn() {

   //Перевірка чи може бот взяти сірник з колоди
    if (leftMatches !== 0) {
       //Якщо кількість сірників в колоді не парна то бот бере 2 сірника
      if (leftMatches % 2 !== 0) {

        if (leftMatches === 1) {
          //Якщо в колоді 1 cірник то візьме всього 1 
          changeStateOnBotTurn(1)
        } else {
          changeStateOnBotTurn(2)
        }
      }
      if (leftMatches % 2 === 0) {
        changeStateOnBotTurn(3) //Якщо кількість сірників в колоді парна то бот бере будь яку непарну кількість сірників
      };
      setCurrentPlayer(players.human);
    };
  };

  //функція яка оптимізує ход бота
  function changeStateOnBotTurn(x) {
    setBotMatches(v => v + x);
    setLeftMatches(v => v - x);
    toast.info(`Bot pick ${x} matches`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  if (!isGameStarted) {
    return (
      <Container>
        <MenuButtons handleStart={handleStart} handleOptions={handleOptions} />
        {showModal &&
          <Modal onClose={toggleModal}>
            <OptionsForm onSubmit={formSubmitHandler} />
          </Modal>}
      </Container>
    )
  }

  //Якщо гра почалась, то рендеремо гру
  if (isGameStarted) {
    //рендер розмітки
    return (
      // рендеримо компонент Container 
      <Container>
        <InGameNav onRestart={RestartGame} onStop={StopGame} />
        {/* //рендеримо компонент Information  */}
        <Information totalMatches={totalMatches} playerMatches={playerMatches} botMatches={botMatches} leftMatches={leftMatches } />
        {/* рендеримо компонент PickButtons  */}
        {currentPlyer === players.human ?
          (<PickButtons buttons={buttons} onHandleButton={onHandleButton} />) : (<p>Bot Turn</p>)}
        
        {/* контейнер бібліотеки react-toastify */}
        <ToastContainer />
      </Container>
    );
  };
  
}
  
