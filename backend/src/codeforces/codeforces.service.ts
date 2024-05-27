/* eslint-disable prettier/prettier */
// codeforces.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CodeforcesService {
  async getUserInfo(username: string) {
    // count = 1 in user.status
    // handel = username
    const response = await axios.get(`https://codeforces.com/api/user.status?count=10&handle=${username}`);
    console.log(response.data.result);
    return response.data.result[0];
  }

  async getRandomProblem() {
    const response = await axios.get('https://codeforces.com/api/problemset.problems');
    const problems = response.data.result.problems;
    const randomProblemIndex = Math.floor(Math.random() * problems.length);
    return problems[randomProblemIndex];
  }

  async checkCompilationError(username: string, contestId: string, indexProblem: string): Promise<boolean> {
    const response = await axios.get(`https://codeforces.com/api/user.status?handle=${username}&count=3`);
    // iterar sobre los 3 ultimos problemas
    for (const submission of response.data.result) {
        // hace cuantos segundos se hizo la submission
        const submissionTime = new Date(submission.creationTimeSeconds * 1000);
        const currentTime = new Date();
        const diff = (currentTime.getTime() - submissionTime.getTime()) / 1000;
        console.log('contestId', submission.problem.contestId, 'index', submission.problem.index, 'diff', diff, 'verdict', submission.verdict);
        console.log(submission.problem.contestId == contestId, submission.problem.index === indexProblem, diff < 120, submission.verdict === 'COMPILATION_ERROR');
        if (submission.problem.contestId == contestId && submission.problem.index == indexProblem && diff < 120 && submission.verdict == 'COMPILATION_ERROR') {
            return true;
        }
    }
    return false;
  }

  async checkAuthenticationName(username: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
      
      if (response.data.status === "OK" && response.data.result.length > 0) {
          const userInfo = response.data.result[0];
          console.log(userInfo.firstName);
          
          // Verificar si el nombre de usuario corresponde al esperado
          return userInfo.firstName === "P2P-Auth";
      } else {
          console.error("Error al obtener información del usuario de Codeforces");
          return false;
      }
    } catch (error) {
        console.error("Error al conectarse a la API de Codeforces:", error);
        return false;
    }
  }

  async checkUserExists(username: string): Promise<boolean> {
    try {
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
      return response.data.status === "OK" && response.data.result.length > 0;
    } catch (error) {
      console.error("Error al conectarse a la API de Codeforces:", error);
      return false;
    }
  }

  async getInfoForProfile(username: string){
    try{
      const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}&checkHistoricHandles=false`);
      return response.data;
    } catch (error) {
      return null;
    }
  } 

  async getValuesHeatMap(username: string) {
    try{
      const response =  await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
      return response.data.result;
    } catch (error) {
      return null;
    }
  }
}
