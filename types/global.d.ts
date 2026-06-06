declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}

declare const __BUILD_INFO__: {
  branch: string;
  commit: string;
  builtTime: string;
  version: string;
};
