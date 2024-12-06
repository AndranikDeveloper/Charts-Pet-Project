declare module "papaparse" {
  export function parse(
    input: string | File,
    options?: {
      complete?: (results: { data: any[] }) => void;
      header?: boolean;
      download?: boolean;
      dynamicTyping?: boolean;
    }
  ): void;
}
