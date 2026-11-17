import { ITestcase } from "../models/problem";


export interface CreateProblemDTO{
    title:string;
    description:string;
    difficulty:"easy" | "medium" | "hard";
    editorial?:string;
    testcases:ITestcase[];
}
export interface UpdateProblemDTO{
    title?:string;
    description?:string;
    difficulty?:"easy" | "medium" | "hard";
    editorial?:string;
    testcases?:ITestcase[];
}