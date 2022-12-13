module.exports = {
    format_plural: (words, amount) => {
        if (amount !==1) {
            return `${words}s`;
        }
        return words;
    },
    format_date: date => {
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
}