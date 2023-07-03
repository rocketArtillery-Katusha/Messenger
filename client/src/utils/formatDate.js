export const formatDate = (notFormatDate) => {
    const date = new Date(notFormatDate);
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    return date.toLocaleDateString('ru-RU', options);
};