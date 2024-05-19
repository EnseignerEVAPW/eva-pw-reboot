export class CreateTeamDto {
    nombre: string;
    contestant1Id: number; // Id del primer contestante
    contestant2Id: number; // Id del segundo contestante
    coachId: number; // Id del entrenador
}