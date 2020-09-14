const DateHelper = {
  getDateTimeFormat: (date: string) => {
    let newDate = new Date(date).toISOString();
    newDate = newDate.replace(/([^T]+)T([^\.]+).*/g, "$1 $2");
    let arrDateTime = newDate.split(` `)
    let arrDate = arrDateTime[0].split(`-`)
    return `${arrDate[2]} / ${arrDate[1]} / ${arrDate[0]} ${arrDateTime[1]}`
  },
};

export default DateHelper;
