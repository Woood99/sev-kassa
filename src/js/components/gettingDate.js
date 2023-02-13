const gettingDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return {
        day: day,
        month: month,
        year: year,
        currentDate: day + '.' + month + '.' + year,
    }
}

export default gettingDate;
