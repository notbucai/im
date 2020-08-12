declare type ShowToastOptionType = {
  type?: 'success' | 'error' | 'warn' | 'info',
  title?: string,
  mark?: boolean,
  timeout?: number
};

declare interface PageProps {
  showToast: (options: ShowToastOptionType) => void;
}

declare interface PageOptopns<T> {
  navbar?: T
}