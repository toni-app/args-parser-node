type ParsedArgs = {
    args: string[],
    options: {}
}

export function parseArgs(input): ParsedArgs {
    const args: string[] = []
    const options = {}
    let nextShortOption: string | undefined = undefined
    for (let i = 2; i < input.length; i++) {
        if (input[i].substr(0, 2) === '--') {
            if (nextShortOption !== undefined) {
                Object.assign(options, parseShortOptions(nextShortOption))
                nextShortOption = undefined
            }
            const optionText = input[i].substr(2)
            Object.assign(options, parseOption(optionText))
        } else if (input[i].substr(0, 1) === '-') {
            if (nextShortOption !== undefined) {
                Object.assign(options, parseShortOptions(nextShortOption))
            }
            nextShortOption = input[i].substr(1)
        } else {
            if (nextShortOption !== undefined) {
                Object.assign(options, parseShortOptions(nextShortOption, input[i]))
                nextShortOption = undefined
            } else {
                args.push(input[i])
            }
        }
    }
    if (nextShortOption !== undefined) {
        Object.assign(options, parseShortOptions(nextShortOption))
        nextShortOption = undefined
    }
    return { args, options }
}

function parseShortOptions(optionText: string, value = undefined): {} {
    const returnObject = {}
    for (let i = 0; i < optionText.length; i++) {
        returnObject[optionText[i]] = value ? value : true
    }

    return returnObject
}

function parseOption(optionText: string): {} {
    const splitString = optionText.split("=")
    const returnObject = {}
    if (splitString.length === 1) {
        returnObject[splitString[0]] = true
    } else {
        returnObject[splitString[0]] = splitString[1]
    }

    return returnObject
}