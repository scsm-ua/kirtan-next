/**/
export type TTranslation = {
  [key: string]:
    | string
    | { [key: string]: string | { [key: string]: string } };
};

/**/
export type GetTranslation = (key: string) => string;
