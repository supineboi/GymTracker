export const convertWeight = (value, fromUnit, toUnit) => {
    if (typeof value !== 'number' || isNaN(value)) {
        return 0
    }
    
    if (fromUnit === toUnit) {
        return value
    }
    
    return fromUnit === 'kg' && toUnit === 'lbs'
        ? Math.round((value * 2.20462) * 100) / 100
        : Math.round((value * 0.453592) * 100) / 100
}

export const convertExercise = (exerciseOrExercises, toUnit) => {
    const convertSingleExercise = (exercise) => {
        return {
            ...exercise,
            highestWeight: convertWeight(exercise.highestWeight, exercise.unit, toUnit),
            lowestWeight: convertWeight(exercise.lowestWeight, exercise.unit, toUnit),
            unit: toUnit
        }
    }
    
    return Array.isArray(exerciseOrExercises)
        ? exerciseOrExercises.map(exercise => convertSingleExercise(exercise))
        : convertSingleExercise(exerciseOrExercises)
}

