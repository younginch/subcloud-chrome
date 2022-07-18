enum MESSAGETAG {
  TAB,
  CREATETAB,
  GETAPI,
  POSTAPI,
  DELETEAPI,
  PATCHAPI,
  GETFILE,
  UPLOADFILE,
  INIT,
  TOAST,
  REVIEW,
  LOGIN,
  LOGOUT,
}

enum Status {
  Pending = 'Pending',
  InReview = 'InReview',
  Approved = 'Approved',
  Rejected = 'Rejected',
  Reported = 'Reported',
  Private = 'Private',
}

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  point: number;
};

type YoutubeVideoInfo = {
  thumbnailUrl: string;
  title: string;
  channel: {
    title: string;
    subscriberCount: number;
    thumbnailUrl: string;
  };
};

type Video = {
  url: string;
  serviceId: string;
  videoId: string;
  youtubeVideoId: string | null;
  youtubeVideo?: YoutubeVideoInfo;
};

export { MESSAGETAG, Status, User, YoutubeVideoInfo, Video };
