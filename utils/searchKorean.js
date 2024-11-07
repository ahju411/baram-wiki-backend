export function cho(str) {
    const cho = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    const result = [];
    for (const char of str) {
        const index = (char.charCodeAt() - 44032) / 588;
        result.push(cho[index] || char);
    }
    return result.join('');
}

export function match(keyword, data) {
    const dataCho = cho(data);
    const keywordCho = cho(keyword);
    const result = [];
    let index = -1;

    do {
        index = dataCho.indexOf(keywordCho, index + 1);
        if (index > -1) result.push(index);
    } while (index > -1);

    return result;
}

export function search(keyword, data) {
    const indexes = match(keyword, data);
    const keywordLength = keyword.length;
    const dataCho = cho(data);
    let result = -1;

    for (const index of indexes) {
        let flag = true;

        for (let j = 0; j < keywordLength; j += 1) {
            const keywordChar = keyword[j];
            const dataChar = (/[ㄱ-ㅎ]/.test(keywordChar) ? dataCho : data).substr(j + index, 1);

            if (dataChar !== keywordChar) {
                flag = false;
                break;
            }
        }

        if (flag) {
            result = index;
            break;
        }
    }

    return result;
}

export function isChoMatch(keyword, data) {
    const dataCho = cho(data);
    const keywordCho = cho(keyword);
    return dataCho.includes(keywordCho);
}