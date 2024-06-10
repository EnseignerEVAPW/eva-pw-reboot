/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';


export class FeedbackDto {
    @IsNotEmpty()
    comment: string;
  
    @IsNotEmpty()
    satisfaction: number;
  
    @IsNotEmpty()
    time: string;
  }