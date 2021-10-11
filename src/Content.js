import React from 'react';
import "./Content.css";
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { faBook } from '@fortawesome/pro-light-svg-icons';
import { faTypewriter } from '@fortawesome/pro-light-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

function Content() {
    const APIKey = 'Your API key goes here';

    const ref = React.createRef();

    const [isOverflowing, setIsOverflowing] = useState(false);
    const [word, setWord] = useState("");
    const [partOfSpeech, setPartOfSpeech] = useState("");
    const [definition, setDefinition] = useState("");

    let date = new Date();
    let dateYear = date.getFullYear();
    let dateMonth = date.getMonth();
    let compensateMonth = dateMonth + 1;
    let dateDay = date.getDate();

    const requestURL = `https://api.wordnik.com/v4/words.json/wordOfTheDay?date=${dateYear}-${compensateMonth}-${dateDay}&api_key=${APIKey}`

    library.add(faBook, faTypewriter);


    React.useLayoutEffect(() => {
        if (ref.current.clientWidth < ref.current.scrollWidth || ref.current.clientHeight < ref.current.scrollHeight) {
            setIsOverflowing(true);
        }
    }, [ref])

    useEffect(() => {
        (async function getWordOfTheDay() {
            await Axios.get(requestURL).then(res => {
                setWord(res.data.word)
                setPartOfSpeech(res.data.definitions[0].partOfSpeech);
                setDefinition(res.data.definitions[0].text);
                console.log(res.data);
            }).catch(error => {
                alert(error);
            })
        })();
    })
    return (
        <div className="app-content-container">
            <div className="word-of-the-day-container">
                <div className="word-of-the-day-icon">
                    <FontAwesomeIcon icon={["fal", "book"]} />
                </div>
                <div className="word-container">
                    <div className="word">{word}</div>
                    <div className="type-of-word">{partOfSpeech}</div>
                </div>
            </div>
            <div ref={ref} className={isOverflowing ? "definition-container scroll-overflow" : "definition-container"}>
                <h2 className='definition-title'>Definition: </h2>
                <div className="definition">{definition}</div>
            </div>
        </div >
    )
}

export default Content
