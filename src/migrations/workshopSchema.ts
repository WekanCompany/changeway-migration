import { compact } from "lodash";
import { Db } from "mongodb"
import winston from "winston"
import { WorkshopType } from "../models/ros/workshop/Workshop";
import { asyncForEach, omit, readRealm } from "../utils";
var ObjectID = require("bson-objectid");
import { ActionType } from "../models/ros/workshop/Action";
// import { Participant, ParticipantType } from "../models/ros/common/Participant";
import { N_ActionType } from "../models/mongodb-realm/workshop/Action";
import { WorkshopParticipantType } from "../models/ros/workshop/WorkshopPartitipant";
import { N_WorkshopParticipantType } from "../models/mongodb-realm/workshop/WorkshopPartitipant";
import { TextGoalType } from "../models/ros/workshop/TextGoal";
import { MagnetType } from "../models/ros/common/Magnet";
import { LabelType } from "../models/ros/common/Label";
import { XMatrixType } from "../models/ros/workshop/XMatrix";
import { XMatrixTriangleType } from "../models/ros/workshop/XMatrixTriangle";
import { XMatrixGoalType } from "../models/ros/workshop/XMatrixGoal";
import { MajorMinorType } from "../models/ros/workshop/MajorMinor";
import { BrainstormType } from "../models/ros/workshop/Brainstorm";
import { PostItType } from "../models/ros/workshop/PostIt";
import { ZoneType } from "../models/ros/workshop/Zone";
import { DataBoxType } from "../models/ros/workshop/DataBox";
import { BoardType } from "../models/ros/workshop/Board";
import { BoardColumnType } from "../models/ros/workshop/BoardColumn";
import { BoardZoneType } from "../models/ros/workshop/BoardZone";
import { BoardCardType } from "../models/ros/workshop/BoardCard";
import { CardTextType } from "../models/ros/workshop/CardText";
import { SummaryPostItType } from "../models/ros/workshop/SummaryPostIt";
import { GraphType } from "../models/ros/workshop/Graph";
import { PreEventChecklistType } from "../models/ros/workshop/PreEventChecklist";
import { EventWeekType } from "../models/ros/workshop/EventWeek";
import { EventTaskType } from "../models/ros/workshop/EventTask";
import { CommentType } from "../models/ros/workshop/Comment";
import { PersonaType } from "../models/ros/workshop/Persona";
import { CompositeCardType } from "../models/ros/workshop/CompositeCard";
import { GeneralType } from "../models/ros/workshop/General";
import { MetadataObjectType } from "../models/ros/workshop/MetadataObject";
import { TemplateMetaDataType } from "../models/ros/workshop/WorkshopTemplateMetadata";
import { N_PersonaType } from "../models/mongodb-realm/workshop/Persona";
import { FileType } from "../models/ros/common/File";
import { N_BrainstromType } from "../models/mongodb-realm/workshop/Brainstrom";
import { GoalType } from "../models/ros/common/Goal";
import { N_PostItType } from "../models/mongodb-realm/workshop/PostIt";
import { SelectType } from "../models/ros/common/Select";
import { N_SummaryPostItType } from "../models/mongodb-realm/workshop/SummaryPostItType";
import { N_MagnetType } from "../models/mongodb-realm/common/Magnet";



async function readAndGenerateId<T>(
    realm: Realm,
    realmCollectionName: string,
    idKey: string,

): Promise<{ coll: T[], ids: any }> {
    let coll: T[] | null = await readRealm<T>(
        realm,
        realmCollectionName
    );
    const idMapper: any = {}

    if (coll) {
        coll.forEach((c: any) => {
            idMapper[c[idKey]] = new ObjectID();
        })
    } else {
        coll = []
    }
    return { coll, ids: idMapper }
}


const MigrateWorkshopSchemas = (workshopId: any, newWorkshopId: any, user: any, realm: Realm, db: Db, logger: winston.Logger, idDb: Db) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(
                `Migrating Workshop ${workshopId} for user ${user.id}.`
            );
            const workshopObject = await readRealm<WorkshopType>(
                realm,
                "Workshop"
            );
            if (workshopObject && workshopObject.length > 0) {
                //Step 1: Id Mapper.
                const { coll: actions, ids: actionMapper } = await readAndGenerateId<ActionType>(realm, "Action", "actionId");
                const { coll: workshopParticipants, ids: participantMapper } = await readAndGenerateId<WorkshopParticipantType>(realm, "Participant", "id");
                const { coll: textGoals, ids: textGoalMapper } = await readAndGenerateId<TextGoalType>(realm, "TextGoal", "textGoalId")
                let { coll: magnets, ids: magnetsMapper } = await readAndGenerateId<MagnetType>(realm, "Magnet", "id");
                const { coll: label, ids: labelMapper } = await readAndGenerateId<LabelType>(realm, "Label", "_id");
                const { coll: xMatrixs, ids: xMatricMapper } = await readAndGenerateId<XMatrixType>(realm, "XMatrix", "xMatrixId");
                const { coll: xMatrixTriangles, ids: XMatrixTriangleMapper } = await readAndGenerateId<XMatrixTriangleType>(realm, "XMatrixTriangle", "xMatrixTriangleId");
                const { coll: XMatrixGoals, ids: XMatrixGoalMapper } = await readAndGenerateId<XMatrixGoalType>(realm, "XMatrixGoal", "xMatrixGoalId");
                const { coll: majorMinor, ids: majorMinorMapper } = await readAndGenerateId<MajorMinorType>(realm, "MajorMinor", "majorMinorId");
                let { coll: brainstorm, ids: brainstormMapper } = await readAndGenerateId<BrainstormType>(realm, "Brainstorm", "brainstormId");
                let { coll: postIt, ids: postItMapper } = await readAndGenerateId<PostItType>(realm, "PostIt", "postItId");
                const { coll: zone, ids: zoneMapper } = await readAndGenerateId<ZoneType>(realm, "Zone", "zoneId");
                const { coll: dataBox, ids: dataBoxMapper } = await readAndGenerateId<DataBoxType>(realm, "DataBox", "dataBoxId");
                const { coll: board, ids: boardMapper } = await readAndGenerateId<BoardType>(realm, "Board", "boardId");
                const { coll: boardColumn, ids: boardColumnMapper } = await readAndGenerateId<BoardColumnType>(realm, "BoardColumn", "columnId");
                const { coll: boardZone, ids: boardZoneMapper } = await readAndGenerateId<BoardZoneType>(realm, "BoardZone", "zoneId");
                const { coll: boardCard, ids: boardCardMapper } = await readAndGenerateId<BoardCardType>(realm, "BoardCard", "cardId");
                const { coll: cardText, ids: cardTextMapper } = await readAndGenerateId<CardTextType>(realm, "CardText", "cardTextId");
                let { coll: summaryPostIt, ids: summaryPostItMapper } = await readAndGenerateId<SummaryPostItType>(realm, "SummaryPostIt", "postItId");
                const { coll: graph, ids: graphMapper } = await readAndGenerateId<GraphType>(realm, "Graph", "graphId");
                const { coll: preEventChecklist, ids: preEventChecklistMapper } = await readAndGenerateId<PreEventChecklistType>(realm, "PreEventChecklist", "id");
                const { coll: eventWeek, ids: eventWeekMapper } = await readAndGenerateId<EventWeekType>(realm, "EventWeek", "zoneId");
                const { coll: eventTask, ids: eventTaskMapper } = await readAndGenerateId<EventTaskType>(realm, "EventTask", "cardId");
                const { coll: comment, ids: commentMapper } = await readAndGenerateId<CommentType>(realm, "Comment", "commentId");
                let { coll: persona, ids: personaMapper } = await readAndGenerateId<PersonaType>(realm, "Persona", "personaId");
                const { coll: compositeCard, ids: compositeCardMapper } = await readAndGenerateId<CompositeCardType>(realm, "CompositeCard", "compositeId");
                const { coll: general, ids: generalMapper } = await readAndGenerateId<GeneralType>(realm, "General", "generalId");
                const { coll: metadataObject, ids: metadataObjectMapper } = await readAndGenerateId<MetadataObjectType>(realm, "MetadataObject", "objectId");
                const { coll: files, ids: fileMapper } = await readAndGenerateId<FileType>(realm, "File", "fileId");
                const { coll: goals, ids: goalMapper } = await readAndGenerateId<GoalType>(realm, "Goal", "goalId");
                const { coll: selects, ids: selectMapper } = await readAndGenerateId<SelectType>(realm, "Select", "selectId");

                // Migrate Actions & Participants:
                const actionCollection = db.collection("Action");
                await asyncForEach(actions, async (action: ActionType) => {
                    let newAction: N_ActionType = action as N_ActionType;
                    newAction._id = actionMapper[action.actionId];
                    newAction._partition = `workshopRealm=${newWorkshopId}`;
                    newAction.assignees = newAction.assignees.map((p) => participantMapper[p.id])
                    newAction = omit(["actionId"], newAction)
                    await actionCollection.insertOne(newAction);
                })
                //Participants
                const wParticipantCollection = db.collection("WorkshopParticipant");
                await asyncForEach(workshopParticipants, async (participant: WorkshopParticipantType) => {
                    let newParticipant: N_WorkshopParticipantType = participant as N_WorkshopParticipantType;
                    newParticipant._id = participantMapper[participant.id];
                    newParticipant._partition = `workshopRealm=${newWorkshopId}`;
                    newParticipant.actions = newParticipant.actions.map((a) => actionMapper[a.actionId])
                    newParticipant = omit(["id"], newParticipant)
                    await wParticipantCollection.insertOne(newParticipant);
                })

                 //Magnets
                 const magnetCollection = db.collection("Magnet");
                 magnets = magnets.map((o: MagnetType) => {
                     let n = o as N_MagnetType;
                     n._id = magnetsMapper[o.id];
                     n._partition = `workshopRealm=${newWorkshopId}`;
                     return n;
                 })
                 if(magnets.length>0){
                     await magnetCollection.insertMany(magnets);
                 }
               

                //Persona
                const personaCollection = db.collection("Persona");
                persona = persona.map((p: PersonaType) => {
                    let nP = p as N_PersonaType;
                    nP._id = personaMapper[p.personaId];
                    nP._partition = `workshopRealm=${newWorkshopId}`;
                    nP.name = p.name.map((cT) => cardTextMapper[cT.cardTextId]);
                    nP.description = p.description.map((d) => brainstormMapper[d.brainstormId]);
                    nP.empathyMap = p.empathyMap.map(e => brainstormMapper[e.brainstormId]);
                    nP.hillStatements = p.hillStatements.map(h => brainstormMapper[h.brainstormId]);
                    if(nP.image){
                        nP.image = fileMapper[p.image.fileId];
                    }
                    nP = omit(["personaId"], nP)
                    return nP;
                });
                if(persona.length>0){
                    await personaCollection.insertMany(persona);
                }

                //BrianStrom
                const brianstromCollection = db.collection("Brainstorm");
                brainstorm = brainstorm.map((b: BrainstormType) => {
                    let n = b as N_BrainstromType;
                    n._id = brainstormMapper[n.brainstormId];
                    n._partition = `workshopRealm=${newWorkshopId}`;
                    n.postIts = b.postIts.map((p) => postItMapper[p.postItId]);
                    n.summaryPostIts = b.summaryPostIts.map((s) => summaryPostItMapper[s.postItId])
                    n.zones = b.zones.map((z) => zoneMapper[z.zoneId])
                    n.goals = b.goals.map((g) => ({ ...g, _id: new ObjectID() }));
                    n.axis = b.axis.map((a) => ({ ...a, _id: new ObjectID() }));
                    return n;
                })
                if(brainstorm.length>0){
                    await brianstromCollection.insertMany(brainstorm);
                }
              

                //Post it
                const postItCollection = db.collection("PostIt");
                postIt = postIt.map((o: PostItType) => {
                    let n = o as N_PostItType;
                    n._id = postItMapper[o.postItId];
                    n._partition = `workshopRealm=${newWorkshopId}`;
                    n.list = o.list.map((l)=> selectMapper[l.selectId]);
                    if(n.file) {
                        n.file = fileMapper[o.file.fileId];
                    }
                    if(n.audioRecording) {
                        n.audioRecording = fileMapper[o.audioRecording.fileId];
                    }
                    if(n.videoRecording) {
                        n.videoRecording = fileMapper[o.videoRecording.fileId];
                    }
                    if(n.image) {
                        n.image = fileMapper[o.image.fileId];
                    }
                    if(n.icon){
                        n.icon = {...n.icon, _id:new ObjectID()}
                    }
                    if(n.magnet){
                        n.magnet = magnetsMapper[o.magnet.id]; 
                    }
                    if(n.zoneId){
                        n.zoneId = zoneMapper[o.zoneId]
                    }
                    return n;
                })
                if(postIt.length>0){
                    await postItCollection.insertMany(postIt);
                }


                 //Summart Post it
                 const summaryPostitCollection = db.collection("SummaryPostIt");
                 summaryPostIt = summaryPostIt.map((o: SummaryPostItType) => {
                     let n = o as N_SummaryPostItType;
                     n._id = summaryPostItMapper[o.postItId];
                     n._partition = `workshopRealm=${newWorkshopId}`;
                     if(n.zoneId){
                         n.zoneId = zoneMapper[o.zoneId]
                     }
                     return n;
                 })
                 if(summaryPostIt.length>0){
                     await summaryPostitCollection.insertMany(summaryPostIt);
                 }


                // //Migrate TemplateMetaData.
                // const { coll: templateObject, ids: TemplateMetaDataMapper } = await readAndGenerateId<TemplateMetaDataType>(realm, "TemplateMetadata", "templateId");
                // await asyncForEach(templateObject, async (template) => {
                //     console.log(template.templateId)
                //     //Persona
                //     //brianstrom
                //     //graph
                //     //CardText
                //     //Goal,
                //     //Scorecard
                //     //DataBox
                //     //XMatrix
                //     //TextGoal,
                //     //General
                //     //Action
                //     //Settings
                //     //Board
                //     //Label                    
                // })

            } else {
                logger.error(`Workshop ${workshopId} not found. So, Ignoring.`)
            }
            resolve(true)
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
}

export default MigrateWorkshopSchemas;
