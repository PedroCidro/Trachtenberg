import { useState, useEffect, useCallback } from 'react';
import Trachtenberg, { Problem, Multiplier } from '@/lib/trachtenberg';
import Storage, { SessionResult } from '@/lib/storage';

export default function useTraining() {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Audio feedback (optional, keeping minimal as per request)

    const generateNewProblem = useCallback((multiplier: Multiplier | 'all', min: number, max: number) => {
        const newProblem = Trachtenberg.generateProblem(multiplier, min, max);
        setProblem(newProblem);
        setInputValue('');
        setFeedback(null);
    }, []);

    const startSession = useCallback((multiplier: Multiplier | 'all', min: number, max: number) => {
        setCorrectCount(0);
        setIncorrectCount(0);
        setElapsedTime(0);
        setStartTime(Date.now());
        setIsActive(true);
        generateNewProblem(multiplier, min, max);
    }, [generateNewProblem]);

    const submitAnswer = useCallback((multiplier: Multiplier | 'all', min: number, max: number) => {
        if (!problem) return;

        const isCorrect = Trachtenberg.validateAnswer(inputValue, problem.answer);

        if (isCorrect) {
            setFeedback('correct');
            setCorrectCount(prev => prev + 1);

            // Auto-advance after delay
            setTimeout(() => {
                generateNewProblem(multiplier, min, max);
            }, 800);
        } else {
            setFeedback('incorrect');
            setIncorrectCount(prev => prev + 1);
            // Don't auto-advance on incorrect, let them see
            setTimeout(() => {
                setFeedback(null);
                setInputValue(''); // Clear input to retry? Or keep? Monkeytype usually clears or shakes
                // For Trachtenberg usually we show the correct answer then next
                // But let's just show feedback and clear
                generateNewProblem(multiplier, min, max);
            }, 1500);
        }
    }, [inputValue, problem, generateNewProblem]);

    // Timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive) {
            interval = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, startTime]);

    // Skip problem
    const skipProblem = useCallback((multiplier: Multiplier | 'all', min: number, max: number) => {
        setIncorrectCount(prev => prev + 1); // Count as incorrect? Or just skip? Usually skip doesn't count or counts as miss. Let's count as miss for simplicity.
        generateNewProblem(multiplier, min, max);
    }, [generateNewProblem]);

    return {
        problem,
        inputValue,
        setInputValue,
        feedback,
        correctCount,
        incorrectCount,
        elapsedTime,
        startSession,
        submitAnswer,
        skipProblem,
        isActive
    };
}
