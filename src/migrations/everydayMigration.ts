import { Db } from "mongodb";
import winston from "winston";
import { N_FileType } from "../models/mongodb-realm/common/File";
import { N_LabelType } from "../models/mongodb-realm/common/Label";
import { N_ConfigType } from "../models/mongodb-realm/everyday/Config";
import { N_DailyDataType } from "../models/mongodb-realm/everyday/DailyData";
import { N_DimensionType } from "../models/mongodb-realm/everyday/Dimension";
import { N_EverydayBoardType } from "../models/mongodb-realm/everyday/EverydayBoard";
import { N_EveryDayLevelType } from "../models/mongodb-realm/everyday/EverydayLevel";
import { N_LineManagerType } from "../models/mongodb-realm/everyday/LineManager";
import { N_MissReasonType } from "../models/mongodb-realm/everyday/MissReason";
import { N_MonthlyDataType } from "../models/mongodb-realm/everyday/MonthlyData";
import { N_ReasonForMissType } from "../models/mongodb-realm/everyday/ReasonForMiss";
import { N_UserBoardListType } from "../models/mongodb-realm/everyday/UserBoardList";
import { N_CommentType } from "../models/mongodb-realm/workshop/Comment";
import { N_EventTaskType } from "../models/mongodb-realm/workshop/EventTaskType";
import { FileType } from "../models/ros/common/File";
import { LabelType } from "../models/ros/common/Label";
import { ParticipantType } from "../models/ros/common/Participant";
import { EverydayActionType } from "../models/ros/everyday/Action";
import { ConfigType } from "../models/ros/everyday/Config";
import { DailyDataType } from "../models/ros/everyday/DailyData";
import { DimensionType } from "../models/ros/everyday/Dimension";
import { EverydayBoardType } from "../models/ros/everyday/EverydayBoard";
import { EverydayBoardInstructionsType } from "../models/ros/everyday/EverydayBoardInstructions";
import { EverydayLevelType } from "../models/ros/everyday/EverydayLevel";
import { GraphSettingsType } from "../models/ros/everyday/GraphSettings";
import { LineManagerType } from "../models/ros/everyday/LineManager";
import { MissIssueType } from "../models/ros/everyday/MissIssue";
import { MissReasonType } from "../models/ros/everyday/MissReason";
import { MonthlyDataType } from "../models/ros/everyday/MonthlyData";
import { ParetoOfGapsType } from "../models/ros/everyday/ParetoOfGaps";
import { PlanType } from "../models/ros/everyday/Plan";
import { PlanValuesType } from "../models/ros/everyday/PlanValues";
import { ReasonForMissType } from "../models/ros/everyday/ReasonForMiss";
import { ShiftTimingType } from "../models/ros/everyday/ShiftTiming";
import { UserBoardListType } from "../models/ros/everyday/UserBoardList";
import { CommentType } from "../models/ros/workshop/Comment";
import { EventTaskType } from "../models/ros/workshop/EventTask";
import { WorkshopParticipantType } from "../models/ros/workshop/WorkshopPartitipant";
import { readRealm } from "../utils";
import { readAndGenerateId } from "./workshopSchema";

var ObjectID = require("bson-objectid");
export const MigrateEverydaySchemas = (companyId: any, newCompanyId: any, user: any, realm: Realm, db: Db, logger: winston.Logger, idDb: Db) => {
    return new Promise(async (resolve, reject) => {
        try {
            logger.info(
                `Migrating Every for company ${companyId} for user ${user.id}.`
            );
            const everydayWorkshopIds = idDb.collection("everydayworkshops")
            const _partition = `everydayRealm=true&companyRealm=${newCompanyId}`
            let { coll: Config, ids: ConfigMapper } = await readAndGenerateId<ConfigType>(realm, "Config", "_id");
            let { coll: EverydayLevel, ids: EverydayLevelMapper } = await readAndGenerateId<EverydayLevelType>(realm, "EverydayLevel", "_id");
            let { coll: EverydayBoard, ids: EverydayBoardMapper } = await readAndGenerateId<EverydayBoardType>(realm, "EverydayBoard", "_id");
            let { coll: UserBoardList, ids: UserBoardListMapper } = await readAndGenerateId<UserBoardListType>(realm, "UserBoardList", "_id");
            let { coll: DailyData, ids: DailyDataMapper } = await readAndGenerateId<DailyDataType>(realm, "DailyData", "_id");
            let { coll: Dimension, ids: DimensionMapper } = await readAndGenerateId<DimensionType>(realm, "Dimension", "_id");
            let { coll: LineManager, ids: LineManagerMapper } = await readAndGenerateId<LineManagerType>(realm, "LineManager", "_id");
            let { coll: MissReason, ids: MissReasonMapper } = await readAndGenerateId<MissReasonType>(realm, "MissReason", "_id");
            let { coll: ReasonForMiss, ids: ReasonForMissMapper } = await readAndGenerateId<ReasonForMissType>(realm, "ReasonForMiss", "_id");
            let { coll: MonthlyData, ids: MonthlyDataMapper } = await readAndGenerateId<MonthlyDataType>(realm, "MonthlyData", "_id");
            let { coll: ParetoOfGaps, ids: ParetoOfGapsMapper } = await readAndGenerateId<ParetoOfGapsType>(realm, "ParetoOfGaps", "_id");
            let { coll: MissIssue, ids: MissIssueMapper } = await readAndGenerateId<MissIssueType>(realm, "MissIssue", "_id");
            let { coll: Plan, ids: PlanMapper } = await readAndGenerateId<PlanType>(realm, "Plan", "_id");
            let { coll: PlanValues, ids: PlanValuesMapper } = await readAndGenerateId<PlanValuesType>(realm, "PlanValues", "_id");
            let { coll: ShiftTiming, ids: ShiftTimingMapper } = await readAndGenerateId<ShiftTimingType>(realm, "ShiftTiming", "_id");
            let { coll: GraphSettings, ids: GraphSettingsMapper } = await readAndGenerateId<GraphSettingsType>(realm, "GraphSettings", null);
            let { coll: EverydayBoardInstructions, ids: EverydayBoardInstructionsMapper } = await readAndGenerateId<EverydayBoardInstructionsType>(realm, "EverydayBoardInstructions", "boardId");
            let { coll: Files, ids: FilesMapper } = await readAndGenerateId<FileType>(realm, "File", "fileId");
            let { coll: EventTask, ids: EventTaskMapper } = await readAndGenerateId<EventTaskType>(realm, "EventTask", "cardId");
            let { coll: Participant, ids: ParticipantMapper } = await readAndGenerateId<WorkshopParticipantType>(realm, "Participant", "email");
            let { coll: Action, ids: ActionMapper } = await readAndGenerateId<EverydayActionType>(realm, "Action", "actionId");
            let { coll: Comment, ids: CommentMapper } = await readAndGenerateId<CommentType>(realm, "Comment", "commentId");
            let { coll: Label, ids: LabelMapper } = await readAndGenerateId<LabelType>(realm, "Label", "id");
            const planIdMapper: any = {}
            const shiftIdMapper: any = {}
            const dimensionIdMapper: any = {}


            const DimensionColl = db.collection("Dimension");
            Dimension = Dimension.map((e: DimensionType) => {
                const _id = DimensionMapper[e._id];
                if (e.dimensionOwner) {
                    e.dimensionOwner = ParticipantMapper[e.dimensionOwner.email];
                }
                if (e.dimensionId) {
                    let dimensionId = dimensionIdMapper[e.dimensionId];
                    if (dimensionId) {
                        e.dimensionId = dimensionId;
                    } else {
                        dimensionId = new ObjectID();
                        dimensionIdMapper[e.dimensionId] = dimensionId;
                        e.dimensionId = dimensionId
                    }
                }
                if (e.boardId) {
                    e.boardId = EverydayBoardMapper[e.boardId] || null;
                } else {
                    e.boardId = null;
                }

                return { ...e, _id, _partition };
            })
            if (Dimension.length > 0) {
                DimensionColl.insertMany(Dimension as N_DimensionType[]);
            }



            // Plan
            const PlanColl = db.collection("Plan");
            Plan = Plan.map((e: PlanType) => {
                const _id = PlanMapper[e._id];
                e.planValues = e.planValues.map((x) => PlanValuesMapper[x._id]);
                if (e.boardId) {
                    e.boardId = EverydayBoardMapper[e.boardId];
                }
                if (e.dimensionId) {
                    let dimensionId = dimensionIdMapper[e.dimensionId];
                    if (dimensionId) {
                        e.dimensionId = dimensionId;
                    } else {
                        dimensionId = new ObjectID();
                        dimensionIdMapper[e.dimensionId] = dimensionId;
                        e.dimensionId = dimensionId
                    }
                }
                if (e.planId) {
                    let planId = planIdMapper[e.planId];
                    if (planId) {
                        e.planId = planId;
                    } else {
                        planId = new ObjectID();
                        planIdMapper[e.planId] = planId;
                        e.planId = planId
                    }
                }
                return { ...e, _id, _partition };
            })
            if (Plan.length > 0) {
                PlanColl.insertMany(Plan as any);
            }



            //ShiftTiming

            const ShiftTimingColl = db.collection("ShiftTiming");
            ShiftTiming = ShiftTiming.map((e: ShiftTimingType) => {
                const _id = ShiftTimingMapper[e._id];

                if (e.boardId) {
                    e.boardId = EverydayBoardMapper[e.boardId];
                }
                if (e.dimensionId) {
                    let dimensionId = dimensionIdMapper[e.dimensionId];
                    if (dimensionId) {
                        e.dimensionId = dimensionId;
                    } else {
                        dimensionId = new ObjectID();
                        dimensionIdMapper[e.dimensionId] = dimensionId;
                        e.dimensionId = dimensionId
                    }
                }

                if (e.shiftId) {
                    let shiftId = shiftIdMapper[e.shiftId];
                    if (shiftId) {
                        e.shiftId = shiftId;
                    } else {
                        shiftId = new ObjectID();
                        shiftIdMapper[e.shiftId] = shiftId;
                        e.shiftId = shiftId
                    }
                }

                return { ...e, _id, _partition };
            })
            if (ShiftTiming.length > 0) {
                ShiftTimingColl.insertMany(ShiftTiming as any);
            }


            // Migrate Config
            const ConfigColl = db.collection("Config");
            Config = Config.map((c: ConfigType) => {
                const _id = ConfigMapper[c._id];
                return { ...c, _id, _partition };
            })
            if (Config.length > 0) {
                ConfigColl.insertMany(Config as N_ConfigType[]);
            }

            //Files
            const fileCollection = db.collection("File");
            Files = Files.map((o: FileType) => {
                let n = o as N_FileType;
                n._id = FilesMapper[o.fileId];
                n._partition = _partition;
                return n;
            })
            if (Files.length > 0) {
                await fileCollection.insertMany(Files);
            }

            //Label
            const labelCollection = db.collection("Label");
            const l: any = Label.map((o: any) => {
                let n = o as N_LabelType;
                n._id = LabelMapper[o._id];
                n._partition = _partition;
                return n;
            })
            if (Label.length > 0) {
                await labelCollection.insertMany(l);
            }

            //Comment
            const commentCollection = db.collection("Comment");
            Comment = Comment.map((o: CommentType) => {
                let n = o as N_CommentType;
                n._id = CommentMapper[o.id];
                n._partition = _partition;
                n.commentId = CommentMapper[o.id];
                if (n.taskId) {
                    n.taskId = EventTaskMapper[o.taskId];
                }
                if (n.userCommented) {
                    n.userCommented = ParticipantMapper[o.userCommented.email];
                }
                n.replies = o.replies.map((r) => CommentMapper[r.id]);
                n.mentions = o.mentions.map((m) => ParticipantMapper[m.email]);
                n.emoticons = o.emoticons.map((e) => {
                    e.participant = ParticipantMapper[e.participant.email];
                    let _id =  new ObjectID()
                    e.reactionId = _id
                    return { ...e, _id }
                })
                return n;
            })
            if (Comment.length > 0) {
                await commentCollection.insertMany(Comment);
            }

            const EverydayLevelColl = db.collection("EverydayLevel");
            EverydayLevel = EverydayLevel.map((e: EverydayLevelType) => {
                const _id = EverydayLevelMapper[e._id];
                //Associated Boards
                e.associatedBoards = e.associatedBoards.map((a) => {
                    return EverydayBoardMapper[a._id];
                })
                if (e.participant) {
                    e.participant = ParticipantMapper[e.participant.email];
                }
                return { ...e, _id, _partition };
            })
            if (EverydayLevel.length > 0) {
                EverydayLevelColl.insertMany(EverydayLevel as N_EveryDayLevelType[]);
            }


            const UserBoardListColl = db.collection("UserBoardList");
            UserBoardList = UserBoardList.map((e: UserBoardListType) => {
                const _id = UserBoardListMapper[e._id];
                e.myBoardsList = e.myBoardsList.map((p) => EverydayBoardMapper[p._id]);
                if (e.userId) {
                    e.userId = e.userId.replace("_", "|");
                }
                return { ...e, _id, _partition };
            })
            if (UserBoardList.length > 0) {
                UserBoardListColl.insertMany(UserBoardList as N_UserBoardListType[]);
            }


            const EverydayBoardColl = db.collection("EverydayBoard");
            const everyDayWorkshops: any = [];
            EverydayBoard = EverydayBoard.map((e: EverydayBoardType) => {
                const _id = EverydayBoardMapper[e._id];
                const newWorkshop = {
                    uuid: e._id,
                    boardId: _id,
                    user,
                    company: { companyId, newCompanyId },
                }
                everyDayWorkshops.push(newWorkshop);
                e.participants = e.participants.map((p) => ParticipantMapper[p.email]);
                if (e.associatedBoards) {
                    e.associatedBoards = e.associatedBoards.map(a => EverydayBoardMapper[a])
                }
                if (e.everydayBoardList) {
                    e.everydayBoardList = e.everydayBoardList.map(a => EverydayBoardMapper[a])
                }
                if (e.dimensionListIds) {
                    e.dimensionListIds = e.dimensionListIds.map((a: any) => dimensionIdMapper[a])
                }
                return { ...e, _id, _partition };
            })
            if (EverydayBoard.length > 0) {
                EverydayBoardColl.insertMany(EverydayBoard as N_EverydayBoardType[]);
            }
            if (everyDayWorkshops.length > 0) {
                everydayWorkshopIds.insertMany(everyDayWorkshops);
            }

            const DailyDataColl = db.collection("DailyData");
            DailyData = DailyData.map((e: DailyDataType) => {
                const _id = DailyDataMapper[e._id];
                if (e.dimension) {
                    e.dimension = DimensionMapper[e.dimension._id];
                }
                if (e.missReasonId) {
                    e.missReasonId = MissReasonMapper[e.missReasonId._id];
                }
                if (e.everydayId) {
                    e.everydayId = EverydayBoardMapper[e.everydayId._id];
                }
                if (e.missIssue) {
                    e.missIssue = MissIssueMapper[e.missIssue._id];
                }

                e.reasonForMiss = e.reasonForMiss.map((p) => ReasonForMissMapper[p._id]);

                return { ...e, _id, _partition };
            })
            if (DailyData.length > 0) {
                DailyDataColl.insertMany(DailyData as N_DailyDataType[]);
            }





            const LineManagerColl = db.collection("LineManager");
            LineManager = LineManager.map((e: LineManagerType) => {
                const _id = LineManagerMapper[e._id];
                if (e.shift) {
                    e.shift = ShiftTimingMapper[e.shift._id];
                }

                return { ...e, _id, _partition };
            })
            if (LineManager.length > 0) {
                LineManagerColl.insertMany(LineManager as N_LineManagerType[]);
            }


            const MissReasonColl = db.collection("MissReason");
            MissReason = MissReason.map((e: MissReasonType) => {
                const _id = MissReasonMapper[e._id];
                if (e.dimension) {
                    e.dimension = DimensionMapper[e.dimension._id];
                }
                return { ...e, _id, _partition };
            })
            if (MissReason.length > 0) {
                MissReasonColl.insertMany(MissReason as N_MissReasonType[]);
            }

            const ReasonForMissColl = db.collection("ReasonForMiss");
            ReasonForMiss = ReasonForMiss.map((e: ReasonForMissType) => {
                const _id = ReasonForMissMapper[e._id];
                if (e.dimension) {
                    e.dimension = DimensionMapper[e.dimension._id];
                }
                if (e.missReason) {
                    e.missReason = MissReasonMapper[e.missReason._id];
                }
                if (e.missReasonId && e.missReasonId.length > 0) {
                    e.missReasonId = MissReasonMapper[e.missReasonId] || null;
                } else {
                    e.missReasonId = null;
                }
                if (e.everydayId) {
                    e.everydayId = EverydayBoardMapper[e.everydayId._id];
                }

                if (e.issue && e.issue.length > 0) {
                    e.issue = EventTaskMapper[e.issue] || null;
                } else {
                    e.issue = null;
                }

                e.comments = e.comments.map((c) => {
                    return CommentMapper[c.commentId];
                })

                e.attachments = e.attachments.map((a) => {
                    return FilesMapper[a.fileId];
                })

                return { ...e, _id, _partition };
            })
            if (ReasonForMiss.length > 0) {
                ReasonForMissColl.insertMany(ReasonForMiss as N_ReasonForMissType[]);
            }



            const MonthlyDataColl = db.collection("MonthlyData");
            MonthlyData = MonthlyData.map((e: MonthlyDataType) => {
                const _id = MonthlyDataMapper[e._id];
                if (e.dimension) {
                    e.dimension = DimensionMapper[e.dimension._id];
                }
                if (e.everydayId) {
                    e.everydayId = EverydayBoardMapper[e.everydayId._id];
                }

                return { ...e, _id, _partition };
            })
            if (MonthlyData.length > 0) {
                MonthlyDataColl.insertMany(MonthlyData as N_MonthlyDataType[]);
            }


            const ParetoOfGapsColl = db.collection("ParetoOfGaps");
            ParetoOfGaps = ParetoOfGaps.map((e: ParetoOfGapsType) => {
                const _id = ParetoOfGapsMapper[e._id];
                if (e.dimension) {
                    e.dimension = DimensionMapper[e.dimension._id];
                }
                if (e.missReason) {
                    e.missReason = MissReasonMapper[e.missReason._id];
                }
                if (e.everydayId) {
                    e.everydayId = EverydayBoardMapper[e.everydayId];
                }
                if (e.missIssue) {
                    e.missIssue = MissIssueMapper[e.missIssue._id];
                }
                if (e.issue && e.issue.length > 0) {
                    e.issue = EventTaskMapper[e.issue] || null;
                } else {
                    e.issue = null;
                }

                e.comments = e.comments.map((c) => {
                    return CommentMapper[c.commentId];
                })

                e.attachments = e.attachments.map((a) => {
                    return FilesMapper[a.fileId];
                })
                return { ...e, _id, _partition };
            })
            if (ParetoOfGaps.length > 0) {
                ParetoOfGapsColl.insertMany(ParetoOfGaps as any);
            }



            const MissIssueColl = db.collection("MissIssue");
            MissIssue = MissIssue.map((e: MissIssueType) => {
                const _id = ParetoOfGapsMapper[e._id];
                if (e.issue) {
                    e.issue = EventTaskMapper[e.issue.cardId];
                }
                if (e.raisedBy) {
                    e.raisedBy = ParticipantMapper[e.raisedBy.email];
                }
                return { ...e, _id, _partition };
            })
            if (MissIssue.length > 0) {
                MissIssueColl.insertMany(MissIssue as any);
            }



            const PlanValuesColl = db.collection("PlanValues");
            PlanValues = PlanValues.map((e: PlanValuesType) => {
                const _id = PlanValuesMapper[e._id];
                if (e.dimension) {
                    e.dimension = DimensionMapper[e.dimension._id];
                }
                return { ...e, _id, _partition };
            })
            if (PlanValues.length > 0) {
                PlanValuesColl.insertMany(PlanValues as any);
            }


            const GraphSettingsColl = db.collection("GraphSettings");
            GraphSettings = GraphSettings.map((e: GraphSettingsType) => {
                const _id = new ObjectID();
                return { ...e, _id, _partition };
            })
            if (GraphSettings.length > 0) {
                GraphSettingsColl.insertMany(GraphSettings as any);
            }

            // EverydayBoardInstructions
            const EverydayBoardInstructionsColl = db.collection("EverydayBoardInstructions");
            EverydayBoardInstructions = EverydayBoardInstructions.map((e: EverydayBoardInstructionsType) => {
                e.boardId = EverydayBoardInstructionsMapper[e.boardId];
                return { ...e, _partition };
            })
            if (EverydayBoardInstructions.length > 0) {
                EverydayBoardInstructionsColl.insertMany(EverydayBoardInstructions as any);
            }

            //EventTask
            const EventTaskColl = db.collection("EventTask");
            EventTask = EventTask.map((o: EventTaskType) => {
                let n = o as N_EventTaskType;
                n._id = EventTaskMapper[o.cardId];
                n._partition = _partition;
                if (n.people) {
                    n.people = ParticipantMapper[o.people.email];
                }
                n.comments = o.comments.map((c) => CommentMapper[c.id]);
                n.assignees = o.assignees.map((m) => ParticipantMapper[m.id]);
                n.attachments = o.attachments.map(f => FilesMapper[f.fileId]);
                n.labels = o.labels.map(l => LabelMapper[l._id]);
                return n;
            })
            if (EventTask.length > 0) {
                await EventTaskColl.insertMany(EventTask);
            }


            //Participants
            const ParticipantCollection = db.collection("WorkshopParticipant");
            Participant = Participant.map((participant: WorkshopParticipantType) => {
                const _id = ParticipantMapper[participant.email];
                if (participant.identity) {
                    participant.identity = participant.identity.replace("_", "|");
                }
                participant.actions = participant.actions.map((x) => ActionMapper[x.actionId])
                return { ...participant, _id, _partition }
            });

            if (Participant.length > 0) {
                await ParticipantCollection.insertMany(Participant);
            }

            const ActionColl = db.collection("Action");
            Action = Action.map((e: EverydayActionType) => {
                const _id = ActionMapper[e.actionId];
                e.assignees = e.assignees.map((x) => ParticipantMapper[x.email])
                return { ...e, _id, _partition }
            });
            if (Action.length > 0) {
                await ActionColl.insertMany(Action);
            }

            return resolve(true)
        } catch (e) {
            console.log(e);
            reject(e)
        }
    })
};