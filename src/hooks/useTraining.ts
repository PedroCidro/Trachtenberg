import { useState, useEffect, useCallback } from 'react';
import Trachtenberg, { Problem, Multiplier } from '@/lib/trachtenberg';
import Storage from '@/lib/storage';
import { canUseExercise, FREE_DAILY_LIMIT } from '@/lib/usageLimit';

export default function useTraining() {
    const [problem, setProblem] = useState<Problem | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [incorrectCount, setIncorrectCount] = useState(0);
    const [startTime, setStartTime] = useState<number>(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    // Usage limit state
    const [dailyUsage, setDailyUsage] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [showPaywall, setShowPaywall] = useState(false);

    // Initialize usage state
    useEffect(() => {
        const usage = Storage.getDailyUsage();
        const sub = Storage.getSubscription();
        setDailyUsage(usage.count);
        setIsSubscribed(sub.isSubscribed);
    }, []);

    const generateNewProblem = useCallback((multiplier: Multiplier | 'all', min: number, max: number) => {
        // Check if user can continue
        const currentUsage = Storage.getDailyUsage().count;
        const sub = Storage.getSubscription();

        if (!canUseExercise(currentUsage, sub.isSubscribed)) {
            setShowPaywall(true);
            return;
        }

        const newProblem = Trachtenberg.generateProblem(multiplier, min, max);
        setProblem(newProblem);
        setInputValue('');
        setFeedback(null);
        setShowPaywall(false);
    }, []);

    const startSession = useCallback((multiplier: Multiplier | 'all', min: number, max: number) => {
        // Check limit before starting
        const currentUsage = Storage.getDailyUsage().count;
        const sub = Storage.getSubscription();
        setDailyUsage(currentUsage);
        setIsSubscribed(sub.isSubscribed);

        if (!canUseExercise(currentUsage, sub.isSubscribed)) {
            setShowPaywall(true);
            setIsActive(true); // Still mark as active so UI renders
            return;
        }

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

        // Increment daily usage on every attempt (correct or incorrect)
        const newUsage = Storage.incrementDailyUsage();
        setDailyUsage(newUsage);

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
                setInputValue('');
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
        setIncorrectCount(prev => prev + 1);
        generateNewProblem(multiplier, min, max);
    }, [generateNewProblem]);

    // Dismiss paywall (for when subscription is successful)
    const dismissPaywall = useCallback(() => {
        const sub = Storage.getSubscription();
        setIsSubscribed(sub.isSubscribed);
        if (sub.isSubscribed) {
            setShowPaywall(false);
        }
    }, []);

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
        isActive,
        // New usage limit exports
        dailyUsage,
        isSubscribed,
        showPaywall,
        dismissPaywall,
        remainingExercises: isSubscribed ? 'unlimited' : Math.max(0, FREE_DAILY_LIMIT - dailyUsage)
    };
}
