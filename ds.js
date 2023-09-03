/* global api */
class KoreanDictionary {
    constructor(options) {
        this.options = options;
        this.maxexample = 2;
        this.word = '';
    }

    async displayName() {
        // Thay đổi tên hiển thị tùy theo ngôn ngữ hoặc ứng dụng của bạn
        return 'Korean Dictionary';
    }

    setOptions(options) {
        this.options = options;
        this.maxexample = options.maxexample;
    }

    async findTerm(word) {
        this.word = word;
        let results = await this.findKorean(word);
        return [].concat(...results).filter(x => x);
    }

    async findKorean(word) {
        let notes = [];
        if (!word) return notes; // Trả về ghi chú trống nếu từ vựng không tồn tại

        // Tạo URL yêu cầu đến trang web từ điển Hàn Quốc
        let base = 'https://krdict.korean.go.kr/api/view?key=659B7B68D1DB3D12994C83DEF2B91586&type_search=view&method=TARGET_CODE&part=word&q=';
        let url = base + encodeURIComponent(word);

        try {
            let data = await api.fetch(url);
            // Xử lý dữ liệu JSON hoặc XML từ trang web từ điển Hàn Quốc để trích xuất định nghĩa và ví dụ
            let resultData = JSON.parse(data); // Điều này phụ thuộc vào định dạng dữ liệu trả về từ trang web
            if (resultData) {
                let definition = resultData.definition; // Thay đổi tên biến tùy theo cấu trúc JSON/XML
                let exampleSentences = resultData.exampleSentences; // Thay đổi tên biến tùy theo cấu trúc JSON/XML

                // Tạo các ghi chú dựa trên định nghĩa và ví dụ
                if (definition) {
                    notes.push({
                        expression: word,
                        definitions: [definition],
                    });
                }

                if (exampleSentences && exampleSentences.length > 0) {
                    let exampleDefinitions = exampleSentences.map(sentence => sentence.definition);
                    let examples = exampleDefinitions.slice(0, this.maxexample);
                    notes.push({
                        expression: word,
                        examples,
                    });
                }
            }
        } catch (err) {
            return [];
        }

        return notes;
    }

    renderCSS() {
        // Định dạng CSS cho ghi chú
        let css = `
            <style>
                /* Thay đổi định dạng CSS tùy theo nhu cầu của bạn */
            </style>`;
        return css;
    }
}

// Sử dụng lớp KoreanDictionary
let koreanDictionary = new KoreanDictionary();

// Sử dụng phương thức findTerm để tìm kiếm từ vựng và lấy kết quả
let wordToSearch = 'your_word_here'; // Thay 'your_word_here' bằng từ vựng bạn muốn tìm kiếm
koreanDictionary.findTerm(wordToSearch).then(results => {
    console.log(results); // In ra kết quả tìm kiếm
}).catch(error => {
    console.error(error);
});
