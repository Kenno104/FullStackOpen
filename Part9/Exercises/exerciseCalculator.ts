interface resultValues {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const argumentParser = (args: Array<string>) => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    const timeArray: Array<number> = JSON.parse(args[2]);
    const target: number = Number(args[3]);

    // console.log('time array: ', timeArray)

    if(Array.isArray(timeArray) && !isNaN(target)) {
        return {
            hours: timeArray,
            target: target
        }
    } else {
        throw new Error('Provided values were in the wrong format!');
    }
}

const calculateScore = (hours: Array<number>, target: number): resultValues => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const trainingHours: number = hours.reduce((acc, cur) => acc + cur, 0);
    let success = false;
    if (trainingHours/periodLength >= target) {
        success = true;
    } else {
        success = false;
    }
    const average = trainingHours/periodLength;
    let rating = 0;
    let ratingDescription = '';
    
    if (average < target) {
        rating = 1;
        ratingDescription = 'You need to work harder!';
    } else if (average === target) {
        rating = 2;
        ratingDescription = 'You reached your goal!';
    } else if (average > target) {
        rating = 3;
        ratingDescription = 'You are doing great!';
    } else {
        throw new Error('This was not accounted for!');
    }

    const result: resultValues = {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    }
    // console.log(result);
    return result;
}

try {
    const { hours, target } = argumentParser(process.argv);
    console.log(calculateScore(hours, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message;
    } 
    console.log(errorMessage);
}

export { calculateScore };