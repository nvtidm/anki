/* global api */
class krdict_Cambridge {
    constructor(options) {
        this.options = options;
        this.maxexample = 2;
        this.word = '';
    }

    async displayName() {
        return 'IDM Test';
    }

    setOptions(options) {
        this.options = options;
        this.maxexample = options.maxexample;
    }

    async findTerm(word) {
        this.word = word;
        let promises = 'Xin chao';
        let results = await Promise.all(promises);
        return [].concat(...results).filter(x => x);
    }
}
