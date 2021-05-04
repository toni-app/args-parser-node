import { parseArgs } from '../lib/args'
import { assert } from 'chai'

describe('Args parser', () => {
    it('Parses arguments', () => {
        const argv = ['node', 'script.js', 'one', 'two', 'three']
        const parsedArgs = parseArgs(argv)
        assert.deepEqual(parsedArgs.args, ['one', 'two', 'three'])
        assert.deepEqual(parsedArgs.options, {})
    })

    it('Parses options', () => {
        const argv = ['node', 'script.js', '-o', 'option value', '-c', '--jig', '--lemon=false']
        const parsedArgs = parseArgs(argv)
        assert.deepEqual(parsedArgs.options, { o: 'option value', c: true, jig: true, lemon: "false" })
    })
})