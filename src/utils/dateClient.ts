const DateClient = class {
    public extractTime(parseData: any) {

        let parseDate = new Date(parseData);
        let currentDate = new Date();
        let distance = Math.abs(currentDate.getTime() - parseDate.getTime());
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        if (days == 0 && hours == 0 && minute == 0)
            return 'Vừa xong';
        else
            return (days == 0 ? (hours == 0 ? minute + ' phút' : hours + ' giờ') : days + ' ngày') + ' trước';
    }
    public formatDate = (date) => {
        let mDate = new Date(date);

        return `0${mDate.getDate()}`.substr(-2) + '-' + `0${mDate.getMonth() + 1}`.substr(-2) + '-' + + mDate.getFullYear();
    }
    public Epoch2LocalTime = (utcSeconds: number) => {
        let d = new Date(0);
        let current = d.setUTCSeconds(utcSeconds);
        let time = new Date(current).toTimeString().split(' ')[0].split(':').splice(0, 2).join(':');
        return time;
    }
    public Epoch2LocalDate = (utcSeconds: number) => {
        let d = new Date(0);
        let current = d.setUTCSeconds(utcSeconds);
        return this.formatDate(current);
    }
    public CurrentUTCTimestamp = () => {
        let tmLoc = new Date();
        let currentUTC = tmLoc.getTime() + (tmLoc.getTimezoneOffset() * 1000);
        return Math.floor(currentUTC / 1000);
    }
    public DateUTCTimestamp = (date) => {
        let tmLoc = new Date(date);
        let currentUTC = tmLoc.getTime() + (tmLoc.getTimezoneOffset() * 1000);
        return Math.floor(currentUTC / 1000);
    }
    public getDateString = (dateTimeString: number | Date) => {
        const dateTime = new Date(dateTimeString)
        const dateString = dateTime.getDate() < 10 ? `0${dateTime.getDate()}` : `${dateTime.getDate()}`
        const monthString = dateTime.getMonth() + 1
        return `${dateString}/${monthString}/${dateTime.getFullYear()}`
    }
    public getTimeString = (dateString: number) => {
        const dateTime = new Date(dateString)
        const hourString = dateTime.getHours() < 10 ? `0${dateTime.getHours()}` : `${dateTime.getHours()}`
        const minuteString = dateTime.getMinutes() < 10 ? `0${dateTime.getMinutes()}` : `${dateTime.getMinutes()}`
        return `${hourString}:${minuteString}`
    }
    public getDayString(day: number) {
        if (day < 0 || day > 6) return 'NaN'
        if (day === 0) return 'Chủ nhật'
        return `Thứ ${day + 1}`
    }
};
const dateClient = new DateClient();
export default dateClient;
