import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { nombre, coachId } = createTeamDto;

    // Buscar el entrenador por ID
    const coach = await this.userRepository.findOne({ where: { id: coachId } });
    if (!coach) {
      throw new Error(`Coach with ID ${coachId} not found`);
    }
    
    const team = new Team();
    team.nombre = nombre;
    team.coach = coach;
    team.contestants = [];
    // Guardar el equipo en la base de datos
    return this.teamRepository.save(team);
  }

  async inviteContestant(teamId: number, username: string) {
    const team = await this.teamRepository.findOne({ where: { id: teamId }, relations: ['contestants'] });
    if (!team) {
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
    
    const contestant = await this.userRepository.findOne({ where: { username } });
    if (!contestant) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    team.contestants.push(contestant);
    return this.teamRepository.save(team);
  }

  async getTeamsByCoach(userId: number): Promise<Team[]> {
    return this.teamRepository.find({
      where: { coach: { id: userId } },
      relations: ['contestants'],
    });
  }

  async findAll(): Promise<Team[]> {
    return this.teamRepository.find({ relations: ['coach', 'contestants'] });
  }

  async findOne(id: number): Promise<Team> {
    const team = await this.teamRepository.findOne({ where: { id }, relations: ['coach', 'contestants'] });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team> {
    const team = await this.teamRepository.preload({
      id,
      ...updateTeamDto,
    });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return this.teamRepository.save(team);
  }

  async remove(id: number): Promise<void> {
    const team = await this.teamRepository.findOne({ where: { id } });
    if (!team) {
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    await this.teamRepository.remove(team);
  }
}
