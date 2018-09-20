const functions = require('../src/index.js');

describe ('Multiply', function() {
    it('takes 2s and multiplies by 5', function() {
        const input = [2,2,2,2,2];
        const expectedOutput= [10,10,10,10,10];
    
        const result = functions.createUrl(input,5);
        expect(result).toEqual(expectedOutput);
    }) 
    
    it('tests for purity', function() {
        const input = [2,2,2,2,2];
        const expectedInput = [2,2,2,2,2];
    
        const expectedOutput= [10,10,10,10,10];
        const result = functions.createUrl(input,5);
    
        expect(result).toEqual(expectedOutput);
        expect(input).toEqual(expectedInput);
    }) 
})