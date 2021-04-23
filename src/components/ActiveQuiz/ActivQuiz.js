import React from "react";
import classes from "./ActivQuiz.module.css";
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = props => (
    <div className={classes.ActivQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{ props.activeNumber }.</strong>&nbsp;
                {props.question}
            </span>
            <small>{ props.activeNumber } из { props.quizLength }</small>
        </p>
        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>
)

export default ActiveQuiz