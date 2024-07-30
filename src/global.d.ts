/**
 * file: Typescript third part dependence declare file
 * date: 2020-07-21
 * author: Frank
 * lastModify: Frank 2020-07-21
 */
declare module "*.scss" {
    const content: Record<string, string>;
    export default content;
}
declare module "*.png" {
    const value: string;
    export = value;
}

interface Window extends Window {
    clinkWebchatOptions:
        | {
              options: {
                  accessId?: string;
                  language?: string;
              };
          }
        | undefined;

    ClinkChatWeb:
        | {
              openSessionWindow: () => void;
          }
        | undefined;
}
