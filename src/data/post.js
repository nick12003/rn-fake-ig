import USERS from "./users";

export default [
  {
    imgUrl:
      "https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-15/343169427_753698139705970_2188620657532678477_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=5LAxk7ime_MAX_vbLGC&edm=AJ9x6zYBAAAA&ccb=7-5&ig_cache_key=MzA4ODY4MDkxODI4MjM5Nzc0NQ%3D%3D.2-ccb7-5&oh=00_AfAEAtqRNsMmfzdGMvzLBSz6hhp_w6G9buB-R7kxcEI96Q&oe=644E9FD9&_nc_sid=cff2a4",
    user: USERS[0].name,
    likes: 2215,
    profileImage: USERS[0].image,
    caption:
      "長大了 你就會懂的比我多 When you grow up, you will know even much more than I currently do.",
    comments: [
      {
        user: "john",
        comment: "藝術細胞從小培養👏",
      },
      {
        user: "shawn",
        comment: "小卷毛🔥🔥🔥",
      },
    ],
  },
  {
    imgUrl:
      "https://scontent-tpe1-1.cdninstagram.com/v/t51.2885-15/339364293_2547381325444755_2003020838994355697_n.jpg?stp=dst-jpg_e35_p1080x1080&_nc_ht=scontent-tpe1-1.cdninstagram.com&_nc_cat=1&_nc_ohc=iwV51kCSldEAX9RXTAM&edm=ACWDqb8BAAAA&ccb=7-5&ig_cache_key=MzA3MzkxMzA1OTA2MDUxMDE2OA%3D%3D.2-ccb7-5&oh=00_AfBsztsuA4cdvq4p7Ro-7huOHLEin1He1Mx9r0ty-gqNEw&oe=644D5835&_nc_sid=1527a3",
    user: USERS[1].name,
    likes: 7741,
    profileImage: USERS[1].image,
    caption: "Birthday week🫠",
    comments: [
      {
        user: "aboutlalisa",
        comment: "I Miss You",
      },
      {
        user: "moone7",
        comment: "We love you so much lisa 🫶🏻",
      },
    ],
  },
];
