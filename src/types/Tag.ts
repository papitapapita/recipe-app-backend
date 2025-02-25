export type Tag = {
  id: number;
  name: string;
};

export type TagDTO = Omit<Tag, 'id'>;
