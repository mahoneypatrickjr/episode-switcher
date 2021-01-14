export function stripAndTruncateHtml(html, maxLength = 500) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent.length > maxLength
      ? tmp.textContent.substr(0, maxLength) + "..."
      : tmp.textContent || "";
  }
  
  export function formatDate(date) {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return monthNames[monthIndex] + ". " + day + ", " + year;
  }
  