import React from 'react';
import "./Content.css";
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { faBook } from '@fortawesome/pro-light-svg-icons';
import { faTypewriter } from '@fortawesome/pro-light-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { red } from '@material-ui/core/colors';

function Content() {
    const APIKey = 'rb7qkqxko58r3xrpiu4neqagjb9tmr82ycotkz8s5rr9y283j';

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
                {/* <div className="definition">
                    The cab arrived late. The inside was in as bad of shape as the outside which was concerning,
                    and it didn't appear that it had been cleaned in months. The green tree air-freshener hanging from the rearview mirror was either exhausted of
                    its scent or not strong enough to overcome the other odors emitting from the cab. The correct decision, in this case, was to get the hell out
                    of it and to call another cab, but she was late and didn't have a choice.
                </div> */}
                <div className="definition">{definition}</div>
            </div>
        </div >
    )
}

export default Content
