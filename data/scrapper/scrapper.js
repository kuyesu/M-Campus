// Define a function to scrape a table and return its data
// function scrapeTable(tableId) {
function scrapeTable(table) {
  //   const table = document.querySelector(`table#${tableId}`);
  const tableData = {
    // title: table.querySelector("caption strong").textContent,
    title: table.querySelector("caption strong").textContent,
    semester: "", // Initialize semester as an empty string
    course: "", // Initialize course as an empty string
    year: "", // Initialize year as an empty string
    academicYear: "", // Initialize academicYear as an empty string
    status: "active",
    days: [],
    users: [],
  };

  const courseNameRow = table.querySelector("thead tr:nth-child(1) th");
  if (courseNameRow) {
    tableData.course = courseNameRow.textContent.trim();
    tableData.semester = table
      .querySelector("caption strong")
      .textContent.split(" ")[(1, 2)];
    tableData.academicYear = table
      .querySelector("caption strong")
      .textContent.split(" ")[0];
    tableData.year = courseNameRow.textContent.trim().split(" ").pop();
  }

  const dayNames = table.querySelectorAll("thead th.xAxis");
  dayNames.forEach((dayName) => {
    tableData.days.push(dayName.textContent.trim());
  });

  const timeSlots = table.querySelectorAll("tbody th.yAxis");
  timeSlots.forEach((timeSlot, index) => {
    const rowData = {
      time: timeSlot.textContent.trim(),
      events: [],
    };

    const cells = table.querySelectorAll("tbody td");
    for (let i = index * 7; i < (index + 1) * 7; i++) {
      rowData.events.push(cells[i] ? cells[i].textContent.trim() : ""); // Check if the element exists
    }

    tableData.days.forEach((day, dayIndex) => {
      rowData[day] = rowData.events[dayIndex];
    });

    tableData[timeSlot.textContent.trim()] = rowData;
  });

  return tableData;
}

// Call the function for each table and store the results in an array
// const tables = ["table_3", "table_5", "table_7"];
const scrapedData = [];

const tables = document.querySelectorAll("table.odd_table, table.even_table");
tables.forEach((table) => {
  scrapedData.push(scrapeTable(table));
});
// tables.forEach((tableId) => {
//   scrapedData.push(scrapeTable(tableId));
// });

// Output the scraped data
console.log(scrapedData);

// download json file
const json = JSON.stringify(scrapedData);
const blob = new Blob([json], { type: "application/json" });
const href = URL.createObjectURL(blob);

// download ("data.json", JSON.stringify(scrapedData));
const link = document.createElement("a");
link.href = href;
link.download = "json.txt";
document.body.appendChild(link);
link.click();

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([JSON.stringify(content)], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

download(scrapedData, "json.txt", "text/plain");
