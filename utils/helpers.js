module.exports = {
    format_date: (date) => {
      // format date as MM/DD/YYYY
      return new Date(date).toLocaleDateString();
    },
    // placeholder in case any additional helpers are needed
  };
  