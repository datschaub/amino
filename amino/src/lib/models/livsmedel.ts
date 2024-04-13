type Link = {
  href?: string;
  rel?: string;
  method?: string;
};

export type Livsmedel = {
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
  naringsvarden?: Naringsvarden[];
  protein: number;
  kcal: number;
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

export type Naringsvarden = {
  namn: string;
  euroFIRkod: string;
  forkortning: string;
  varde: number;
  enhet: string;
  viktGram: number;
  berakning: string;
  vardetyp: string;
  vardetypkod: string;
  ursprung: string;
  ursprungkod: string;
  publikation: string;
  metodtyp: string;
  metodtypkod: string;
  metodindikator: string;
  metodindikatorkod: string;
  referenstyp: string;
  referenstypkod: string;
  kommentar: string;
};