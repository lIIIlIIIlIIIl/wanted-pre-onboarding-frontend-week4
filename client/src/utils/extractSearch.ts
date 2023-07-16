interface ResponseDataType {
  sickCd: string;
  sickNm: string;
}

export const extractSearch = (
  responseData: ResponseDataType[],
  word: string
) => {
  return responseData
    .filter((item) => item.sickNm.indexOf(word) === 0)
    .map((item) => item.sickNm);
};
