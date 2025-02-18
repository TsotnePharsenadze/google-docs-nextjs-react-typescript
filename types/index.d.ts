type UserTypeLiveBlock = {
  connectionId: number;
  id: string;
  info: {
    name: string;
    avatar: string;
  };
  presence: {
    __yjs_clientid: number;
    __yjs: {
      user: {
        name: string;
      };
    };
  };
  canWrite: boolean;
  canComment: boolean;
};
