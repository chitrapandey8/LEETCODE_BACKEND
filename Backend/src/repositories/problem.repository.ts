import { IProblem, Problem } from "../models/problem";


export interface IProblemRepository{
    createProblem(problem:Partial<IProblem>): Promise<IProblem>;
    getProblemById(id:String):Promise<IProblem | null>;
    getAllProblems(): Promise<{problems:IProblem[], total:number}>;
    updateProblem(id:string, updateData:Partial<IProblem>): Promise<IProblem | null>;
    deleteProblem(id:string):Promise<boolean>;
    findByDifficulty(difficulty: "easy" | "medium" | "hard"):Promise<IProblem[]>;
    searchProblem(query:string):Promise<IProblem[]>;
}

export class ProblemRepository implements IProblemRepository{
    async createProblem(problem: Partial<IProblem>): Promise<IProblem> {
        const newProblem = new Problem(problem);
        return await newProblem.save();
    }

    async getProblemById(id: String): Promise<IProblem | null> {
        return await Problem.findById(id);
    }

    async getAllProblems(): Promise<{ problems: IProblem[]; total: number; }> {
       const problems = await Problem.find().sort({createdAt: -1});
       const total = await Problem.countDocuments();
       return {problems, total}; 
    }
    async deleteProblem(id: string): Promise<boolean> {
        const result = await Problem.findByIdAndDelete(id);
        return result !== null;
    }

    async updateProblem(id:string, updateData:Partial<IProblem>): Promise<IProblem | null>{
        return await Problem.findByIdAndUpdate(id, updateData, {new:true});
    }

    async findByDifficulty(difficulty: "easy" | "medium" | "hard"): Promise<IProblem[]> {
        return await Problem.find({difficulty}).sort({createdAt:-1});
    }
    async searchProblem(query: string): Promise<IProblem[]> {
        const regex = new RegExp(query,"i");
        return await Problem.find({$or:[{title:regex}, {description:regex}]});
    }
    
}