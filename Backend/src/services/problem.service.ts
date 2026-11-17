import { CreateProblemDTO, UpdateProblemDTO } from "../dtos/problem.dto";
import { IProblem } from "../models/problem";
import { IProblemRepository } from "../repositories/problem.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";

export interface IProblemService{
    createProblem(problem:CreateProblemDTO):Promise<IProblem>;
    getProblemById(id:string):Promise<IProblem | null>;
    getAllProblems():Promise<{problems:IProblem[], total:number}>;
    updateProblem(id:string, updateData:UpdateProblemDTO):Promise<IProblem | null>;
    deleteProblem(id:string):Promise<boolean>;
    findByDifficulty(difficulty:"easy"| "medium" | "hard"):Promise<IProblem[]>;
    searchProblem(query:string):Promise<IProblem[]>;

}

export class ProblemService implements IProblemService {

   private problemRepository:IProblemRepository;

   constructor(problemRepository:IProblemRepository){ ///constructer based dependecy injection
     this.problemRepository = problemRepository;
   }

    async createProblem(problem: CreateProblemDTO): Promise<IProblem> {
        return await this.problemRepository.createProblem(problem);

    }

    async getProblemById(id: string): Promise<IProblem | null> {
        const problem = await this.problemRepository.getProblemById(id);
        if(!problem){
            throw new NotFoundError("Problem not found");
        }
        return problem;
    }
     
    async getAllProblems(): Promise<{ problems: IProblem[]; total: number; }> {
        return await this.problemRepository.getAllProblems();
    }
    
    async updateProblem(id: string, updateData: UpdateProblemDTO): Promise<IProblem | null> {
        const problem = await this.problemRepository.getProblemById(id);

        if(!problem){
            throw new NotFoundError("Problem not Found");

        }
        return problem;
    }

    async updateProblems(id:string, updateData:UpdateProblemDTO):Promise<IProblem | null>{
        const problem = await this.problemRepository.getProblemById(id);

        if(!problem){
            throw new NotFoundError("Problem not found");
        }
        return await this.problemRepository.updateProblem(id,updateData);

    }

    async deleteProblem(id: string): Promise<boolean> {
        const result = await this.problemRepository.deleteProblem(id);
        if(!result){
            throw new NotFoundError("Problem not found");
        }
        return result;
    }
    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]> {
        return await this.problemRepository.findByDifficulty(difficulty);
    }

    async searchProblem(query: string): Promise<IProblem[]> {
        if(!query || query.trim() === ""){
            throw new BadRequestError("Query is required");
        }
        return await this.problemRepository.searchProblem(query);
    }
   
}