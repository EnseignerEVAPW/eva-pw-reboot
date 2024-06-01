/* eslint-disable prettier/prettier */
export interface SimpleTeam {
    id: number;
    name: string;
    members: {
      username: string;
      isCoach: boolean;
    }[];
  }