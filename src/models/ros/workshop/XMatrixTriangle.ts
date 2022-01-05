import { BrainstormType } from "./Brainstorm";
import { XMatrixGoalType } from "./XMatrixGoal";

export type XMatrixTriangleType ={
	xMatrixTriangleId: string;
    title: string;
    goals: XMatrixGoalType;
    brainstorm: BrainstormType;
    linkedTriangle: XMatrixTriangleType;
    xMatrix: any;
}

export const XMatrixTriangle = {
	name: "XMatrixTriangle",
	primaryKey: "xMatrixTriangleId",
	properties: {
		xMatrixTriangleId: "string",
		title: "string",
		goals: "XMatrixGoal[]",
		brainstorm: "Brainstorm",
		linkedTriangle: "XMatrixTriangle",
		xMatrix: {
			type: "linkingObjects",
			objectType: "XMatrix",
			property: "right"
		}
	}
};