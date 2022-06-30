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
  Pending,
  InReview,
  Approved,
  Rejected,
  Reported,
  Private,
}

export { MESSAGETAG, Status };
