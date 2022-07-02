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

export { MESSAGETAG, Status };
