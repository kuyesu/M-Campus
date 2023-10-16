// Define a function to scrape a table and return its data
function scrapeTable(tableId) {
  const table = document.querySelector(`table#${tableId}`);
  const tableData = {
    title: table.querySelector("caption strong").textContent,
    semester: "", // Initialize semester as an empty string
    course: "", // Initialize course as an empty string
    year: "", // Initialize year as an empty string
    academicYear: "", // Initialize academicYear as an empty string
    status: "active",
    days: [],
    users: [
      {
        user: {
          type: Object,
        },
        title: {
          type: String,
        },
        image: {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  };

  const courseNameRow = table.querySelector("thead tr:nth-child(1) th");
  if (courseNameRow) {
    tableData.course = courseNameRow.textContent.trim();
    tableData.semester = table
      .querySelector("caption strong")
      .textContent.split(" ")[1 - 2];
    tableData.academicYear = table
      .querySelector("caption strong")
      .textContent.split(" ")[0];
    tableData.year = courseNameRow.textContent.trim().split(" ")[1];
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
const tables = ["table_3", "table_5", "table_7"];
const scrapedData = [];

tables.forEach((tableId) => {
  scrapedData.push(scrapeTable(tableId));
});

// Output the scraped data
console.log(scrapedData);
