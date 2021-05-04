# Node Args Parser

Utility function used to parse input args and return an object representing input args and options

## Usage

All you need to do is give the parseArgs function the argv global variable. The function returns an object with arguments in an array and options in an object.

`node myscript.js firstArg secondArg -o --anotherOption -t 45`

will return the object
```javascript
{
    args: ['firstArg','secondArg'],
    options: {
        o: true,
        anotherOption: true,
        t: '45'
    }
}
```

```javascript
//Import parseArgs from library (TODO)
const myArgs = parseArgs(argv)