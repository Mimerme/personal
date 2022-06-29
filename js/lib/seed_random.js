// An implementation of 
// https://en.wikipedia.org/wiki/Multiply-with-carry_pseudorandom_number_generator
// Ripped from https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
export default class SeedRandom{
    constructor(){
        this.m_w = 123456789;
        this.m_z = 987654321;
        this.mask = 0xffffffff;
    }
    // Takes any integer
    seed(i) {
        this.m_w = (123456789 + i) & this.mask;
        this.m_z = (987654321 - i) & this.mask;
    }
    // Returns number between 0 (inclusive) and 1.0 (exclusive),
    // just like Math.random().
    random()
    {
        this.m_z = (36969 * (this.m_z & 65535) + (this.m_z >> 16)) & this.mask;
        this.m_w = (18000 * (this.m_w & 65535) + (this.m_w >> 16)) & this.mask;
        var result = ((this.m_z << 16) + (this.m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    }

    randomWithSeed(i){
        this.seed(i);
        return this.random();
    }

    // Generates hashcode from string
    static hashCode(s) {
        for(var i = 0, h = 0; i < s.length; i++)
            h = Math.imul(31, h) + s.charCodeAt(i) | 0;
        return h;
    }
}


