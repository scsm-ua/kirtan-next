/**/
export type TAudio = {
  embed_url: string;
  iframe_url: string;
  personId: string;
  title: string;
};

/**/
export type TImage = {
  src: string;
  type: string;
  width: number;
  height: number;
  length: number;
};

/**/
export type TResource = {
  audio?: Array<TAudio>;
  image?: TImage;
};
