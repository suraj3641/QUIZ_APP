// src/components/Quiz.js
import React, { useState, useEffect, useRef } from 'react';

const questions =[
    {
        "question": "Who wrote 'Hamlet'?",
        "options": ["Shakespeare", "Dickens", "Hemingway", "Orwell"],
        "answer": "Shakespeare"
    },
    {
        "question": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Lisbon"],
        "answer": "Paris"
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "answer": "Mars"
    },
    {
        "question": "What is the largest ocean on Earth?",
        "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        "answer": "Pacific Ocean"
    },
    {
        "question": "Who painted the Mona Lisa?",
        "options": ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"],
        "answer": "Leonardo da Vinci"
    },
    {
        "question": "Which element has the chemical symbol 'O'?",
        "options": ["Oxygen", "Gold", "Silver", "Iron"],
        "answer": "Oxygen"
    },
    {
        "question": "Who discovered penicillin?",
        "options": ["Marie Curie", "Isaac Newton", "Albert Einstein", "Alexander Fleming"],
        "answer": "Alexander Fleming"
    },
    {
        "question": "What is the smallest unit of life?",
        "options": ["Atom", "Molecule", "Cell", "Organ"],
        "answer": "Cell"
    },
    {
        "question": "Which country is the largest by area?",
        "options": ["Canada", "China", "Russia", "United States"],
        "answer": "Russia"
    },
    {
        "question": "Who wrote 'Pride and Prejudice'?",
        "options": ["Charlotte Bronte", "Emily Dickinson", "Jane Austen", "George Eliot"],
        "answer": "Jane Austen"
    }
];


const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(parseInt(localStorage.getItem('currentQuestion')) || 0);
    const [score, setScore] = useState(parseInt(localStorage.getItem('score')) || 0);
    const [timeLeft, setTimeLeft] = useState(parseInt(localStorage.getItem('timeLeft')) || 600);

    const intervalRef = useRef(null);

    useEffect(() => {
        if (intervalRef.current) return;
        intervalRef.current = setInterval(() => {
            setTimeLeft(prevTime => {
                if (prevTime <= 0) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    return 0;
                }
                localStorage.setItem('timeLeft', prevTime - 1);
                return prevTime - 1;
            });
        }, 1000);
        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        document.onfullscreenchange = () => {
            if (!document.fullscreenElement) {
                alert("Please enable full-screen mode to continue the quiz.");
                document.documentElement.requestFullscreen();
            }
        };
        // document.documentElement.requestFullscreen();
    }, []);

    useEffect(() => {
        localStorage.setItem('currentQuestion', currentQuestion);
        localStorage.setItem('score', score);
    }, [currentQuestion, score]);

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestion].answer) {
            setScore(score + 1);
        }
        setCurrentQuestion(currentQuestion + 1);
    };

    if (currentQuestion >= questions.length || timeLeft <= 0) {
        return <div>Quiz Finished! Your score is {score}</div>;
    }

    return (
        <div>
            <h1>Quiz</h1>
            <div>Time Left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</div>
            <div>
                <p>{questions[currentQuestion].question}</p>
                {questions[currentQuestion].options.map(option => (
                    <button key={option} onClick={() => handleAnswer(option)}>{option}</button>
                ))}
            </div>
        </div>
    );
};

export default Quiz;

