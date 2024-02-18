// BMI = mass / height^2

interface BmiValues {
    height: number;
    weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateBMI = (height: number, weight: number, confirmationText: string) => {
    const bmi: number = weight / (height/100) ** 2;
    console.log(confirmationText, `${bmi} kg/m^2`);
    switch(true) {
        case bmi < 18.5:
            return  'Underweight (Unhealthy)';
        case bmi >= 18.5 && bmi < 22.9:
            return 'Normal range (Healthy)';
        case bmi >= 23 && bmi < 24.9:
            return 'Overweight (At risk)';
        case bmi >= 25 && bmi <= 29.9:
            return 'Overweight (Moderately obese)';
        case bmi >= 30:
            return 'Overweight (Severely obese)';
        default: 
            throw new Error('Number is not accounted for in formula!');
    }
}

try {
    const {height, weight} = parseArguments(process.argv);
    console.log(calculateBMI(height, weight, `Values used: Height: ${height} and Weight: ${weight}.`));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error ' + error.message;
    } 
    console.log(errorMessage);
}

export { calculateBMI };
