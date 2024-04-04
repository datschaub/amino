type Link = {
  href?: string;
  rel?: string;
  method?: string;
};

type Livsmedel = {
  livsmedelsTypId: number;
  livsmedelsTyp?: string;
  nummer: number;
  version: string;
  namn?: string;
  vetenskapligtNamn?: string;
  projekt?: string;
  analys?: string;
  tillagningsmetod?: string;
  links?: Link[];
};

type Meta = {
  totalRecords: number;
  offset: number;
  limit: number;
  count: number;
};

export type Livsmedelsida = {
  _meta: Meta;
  _links?: Link[];
  livsmedel?: Livsmedel[];
};