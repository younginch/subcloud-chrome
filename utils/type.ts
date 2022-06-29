enum MESSAGETAG {
  TAB,
  GETAPI,
  POSTAPI,
  GETFILE,
  UPLOADFILE,
  INIT,
}

enum Status {
  Pending,
  InReview,
  Approved,
  Rejected,
  Reported,
  Private,
}

export { MESSAGETAG, Status };
