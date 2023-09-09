interface Reply {
  title: string;
  value: string;
  messageId?: any;
}

interface QuickReplies {
  type: "radio" | "checkbox";
  values: Reply[];
  keepIt?: boolean;
}


export const message = [
  {
    _id: 1,
    text: "This is a quick reply. Do you love Gifted Chat? (radio) KEEP IT",
    createdAt: new Date(),
    quickReplies: {
      type: "radio", // or 'checkbox',
      keepIt: true,
      values: [
        {
          title: "😋 Yes",
          value: "yes",
        },
        {
          title: "📷 Yes, let me show you with a picture!",
          value: "yes_picture",
        },
        {
          title: "😞 Nope. What?",
          value: "no",
        },
      ],
    },
    user: {
      _id: 2,
      name: "React Native",
    },
  },
  {
    _id: 2,
    text: "This is a quick reply. Do you love Gifted Chat? (checkbox)",
    createdAt: new Date(),
    quickReplies: {
      type: "checkbox", // or 'radio',
      values: [
        {
          title: "Yes",
          value: "yes",
        },
        {
          title: "Yes, let me show you with a picture!",
          value: "yes_picture",
        },
        {
          title: "Nope. What?",
          value: "no",
        },
      ],
    },
    user: {
      _id: 2,
      name: "React Native",
    },
  },
];