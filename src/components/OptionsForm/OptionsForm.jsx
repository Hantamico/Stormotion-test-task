import { useState } from "react"
import css from "./OptionsForm.module.css"

export default function OptionsForm({onSubmit}) {
    const [inputTotalMatches, setInputTotalMatches] = useState(25);
    const [inputMatchesPerTurn, setInputMatchesPerTurn] = useState(3);
    const [firstTurn, setFirstTurn] = useState("you");

    function handleChange(e) {
        switch (e.currentTarget.name) {
            case 'totalMatches':
                setInputTotalMatches(e.currentTarget.value);
                break;
            case 'matchesPerTurn':
                setInputMatchesPerTurn(e.currentTarget.value);
                break;
            case 'firstTurn':
                setFirstTurn(e.currentTarget.value);
                break;
            default:
                return;
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSubmit({
            totalMatches: inputTotalMatches,
            matchesPerTurn: inputMatchesPerTurn,
            firstTurn: firstTurn,
        });

    }

    return (
        <div className={css.form__container}>
            <h2 className={css.form__title}>Options</h2>
            <form className={css.form__area} onSubmit={handleSubmit}>
                <label className={css.form__label}>
                    Choose how many matches in the box (by default 25)
                    <input required className={css.form__input} value={inputTotalMatches} onChange={handleChange} name="totalMatches"></input>
                </label>
                <label className={css.form__label}>
                    Choose how many matches you can take per turn at most(by default 3)
                    <input required className={css.form__input} value={inputMatchesPerTurn} onChange={handleChange} name="matchesPerTurn"></input>
                </label>
                <p>First turn</p>
                <label >
                    <input
                        type="radio"
                        name="firstTurn"
                        value="you"
                        onChange={handleChange}
                        checked={firstTurn==="you"}
                    />
                    You
                </label>
                 <label>
                    <input
                        type="radio"
                        name="firstTurn"
                        value="bot"
                        onChange={handleChange}
                        checked={firstTurn==="bot"}
                    />
                    Bot
                </label>
                <button className={css.form__submitBtn} type="submit">Save Changes</button>
            </form>
        </div>
    )
}