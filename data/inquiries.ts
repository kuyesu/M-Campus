const data = [
  {
    date: "June 20, 2023",
    tickets: [
      {
        title: "Missing Marks",
        status: "answered",
        ai: true,
        time: "10:00AM",
        aiResponse: "This is a response from AI",
      },
      {
        title: "Payment",
        status: "unanswered",
        ai: false,
        time: "11:00AM",
        aiResponse: "This is a response from AI",
      },
      {
        title: "Login credential",
        status: "pending",
        ai: true,
        time: "04:00PM",
        aiResponse: "This is a response from AI",
      },
    ],
  },
  {
    date: "2023-07-11",
    tickets: [
      {
        title: "Lesson",
        status: "answered",
        ai: true,
        time: "10:00AM",
        aiResponse: "This is a response from AI",
      },
    ],
  },
  {
    date: "2023-07-11",
    tickets: [
      { title: "Lecture room", status: "pending" },
      {
        title: "Map around",
        status: "unanswered",
        ai: true,
        time: "10:00AM",
        aiResponse: "This is a response from AI",
      },
    ],
  },
];

export default data;
