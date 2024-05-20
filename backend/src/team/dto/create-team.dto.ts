export class CreateTeamDto {
    nombre: string;
    contestantIds : number[]; // Lista de IDs de los concursantes
    coachId: number; // ID del entrenador
}
