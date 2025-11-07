/**/
export type TTranslation = {
  [key: string]:
    | string
    | { [key: string]: string | { [key: string]: string } };
};

/**/
export type GetTranslation = (key: string) => string;

/**/
export type TPill = {
  // page: string;
  // path: string;
  title: string;
  // type?: string;
};
