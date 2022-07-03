enum MESSAGETAG {
  TAB,
  GETAPI,
  POSTAPI,
  GETFILE,
  UPLOADFILE,
  INIT,
  TOAST,
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
  name: string;
  email: string;
  image: string;
  point: number;
};

export { MESSAGETAG, Status, User };
