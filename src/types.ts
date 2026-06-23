export type Brother = {
  id: string;
  first_name: string;
  last_name: string;
  major: string;
  minor: string;
  college: string;
  start_year: number;
  grad_year: number;
  headshot: string;
  exec: boolean;
  persona: boolean;
  active: boolean;
  linkedin: string;
  positions: string[];
}

export type Team = {
  id: number;
  name: string;
  big_three: boolean;
  caption: string;
}