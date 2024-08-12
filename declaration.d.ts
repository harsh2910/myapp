declare module 'json-diff' {
    const jsondiff: {
      diff: (oldObj: any, newObj: any) => any;
    };
    export default jsondiff;
  }