import { compact, iteratee } from "lodash";
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
import { XMatrixGoal, XMatrixGoalType } from "../models/ros/workshop/XMatrixGoal";
import { MajorMinorType } from "../models/ros/workshop/MajorMinor";
import { BrainstormType } from "../models/ros/workshop/Brainstorm";
import { PostIt, PostItType } from "../models/ros/workshop/PostIt";
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
import { N_CommentType } from "../models/mongodb-realm/workshop/Comment";
import { N_EventTaskType } from "../models/mongodb-realm/workshop/EventTaskType";
import { N_EventWeekType } from "../models/mongodb-realm/workshop/EventWeek";
import { N_TextGoalType } from "../models/mongodb-realm/workshop/TextGoal";
import { N_LabelType } from "../models/mongodb-realm/common/Label";
import { N_MajorMinorType } from "../models/mongodb-realm/common/MajorMinor";
import { N_FileType } from "../models/mongodb-realm/common/File";
import { N_SelectType } from "../models/mongodb-realm/common/Select";
import { KPIResultsType } from "../models/ros/common/KPIResults";
import { N_GoalType } from "../models/mongodb-realm/common/Goal";
import { N_CompositeCardType } from "../models/mongodb-realm/workshop/CompositeCard";
import { N_BoardCardType } from "../models/mongodb-realm/workshop/BoardCard";
import { N_ZoneType } from "../models/mongodb-realm/workshop/ZoneType";
import { N_GraphType } from "../models/mongodb-realm/workshop/Graph";
import { N_GeneralType } from "../models/mongodb-realm/workshop/General";
import { N_CardTextType } from "../models/mongodb-realm/workshop/CardText";
import { N_PreeventChecklistType } from "../models/mongodb-realm/workshop/PreeventChecklist";
import { N_MetaObjectType } from "../models/mongodb-realm/workshop/MetaObject";
import { N_DataBoxType } from "../models/mongodb-realm/workshop/Databox";
import { N_BoardType } from "../models/mongodb-realm/workshop/Board";
import { N_BoardColumnType } from "../models/mongodb-realm/workshop/BoardColumn";
import { N_BoardZoneType } from "../models/mongodb-realm/workshop/BoardZone";
import { BoardZoneLinkType } from "../models/ros/workshop/BoardZoneLink";
import { N_BoardZoneLinkType } from "../models/mongodb-realm/workshop/BoardZoneLink";
import { N_TemplateMetaDataType } from "../models/mongodb-realm/workshop/TemplateMetadata";
import { ScorecardType } from "../models/ros/common/Scorecard";
import { N_ScorecardType } from "../models/mongodb-realm/common/Scorecard";
import { N_WorkshopType } from "../models/mongodb-realm/workshop/Workshop";
import { KPIType } from "../models/ros/common/KPI";
import { N_RevenueType } from "../models/mongodb-realm/common/Revenue";
import { N_FormulaType } from "../models/mongodb-realm/common/Formula";




export async function readAndGenerateId<T>(
    realm: Realm,
    realmCollectionName: string,
    idKey: string | null,

): Promise<{ coll: T[], ids: any }> {
    let coll: T[] | null = await readRealm<T>(
        realm,
        realmCollectionName
    );
    const idMapper: any = {}

    if (coll) {
        coll.forEach((c: any) => {
            if (idKey) {
                idMapper[c[idKey]] = new ObjectID();
            }

        })
    } else {
        coll = []
    }
    return { coll, ids: idMapper }
}


const MigrateWorkshopSchemas = (workshopId: any, newWorkshopId: any, user: any, realm: Realm, db: Db, logger: winston.Logger, idDb: Db, _partitionString?: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            let _partition: string = "";
            if (!_partitionString) {
                _partition = `workshopRealm=${newWorkshopId}`
                logger.info(
                    `Migrating Workshop ${workshopId} for user ${user.id}.`
                );
            } else {
                _partition = _partitionString
                logger.info(
                    `Migrating Workshop ${workshopId} for Everyday of everybay board ${newWorkshopId} for user ${user.id}.`
                );
            }

            const workshopObject = await readRealm<WorkshopType>(
                realm,
                "Workshop"
            );
            if (workshopObject && workshopObject.length > 0) {
                //Step 1: Id Mapper.
                const { coll: actions, ids: actionMapper } = await readAndGenerateId<ActionType>(realm, "Action", "actionId");
                const { coll: workshopParticipants, ids: participantMapper } = await readAndGenerateId<WorkshopParticipantType>(realm, "Participant", "email");
                let { coll: textGoals, ids: textGoalMapper } = await readAndGenerateId<TextGoalType>(realm, "TextGoal", "textGoalId")
                let { coll: magnets, ids: magnetsMapper } = await readAndGenerateId<MagnetType>(realm, "Magnet", "id");
                let { coll: label, ids: labelMapper } = await readAndGenerateId<LabelType>(realm, "Label", "_id");
                let { coll: xMatrixs, ids: xMatricMapper } = await readAndGenerateId<XMatrixType>(realm, "XMatrix", "xMatrixId");
                let { coll: xMatrixTriangles, ids: XMatrixTriangleMapper } = await readAndGenerateId<XMatrixTriangleType>(realm, "XMatrixTriangle", "xMatrixTriangleId");
                let { coll: XMatrixGoals, ids: XMatrixGoalMapper } = await readAndGenerateId<XMatrixGoalType>(realm, "XMatrixGoal", "xMatrixGoalId");
                let { coll: majorMinor, ids: majorMinorMapper } = await readAndGenerateId<MajorMinorType>(realm, "MajorMinor", "majorMinorId");
                let { coll: brainstorm, ids: brainstormMapper } = await readAndGenerateId<BrainstormType>(realm, "Brainstorm", "brainstormId");
                let { coll: postIt, ids: postItMapper } = await readAndGenerateId<PostItType>(realm, "PostIt", "postItId");
                let { coll: zone, ids: zoneMapper } = await readAndGenerateId<ZoneType>(realm, "Zone", "zoneId");
                let { coll: dataBox, ids: dataBoxMapper } = await readAndGenerateId<DataBoxType>(realm, "DataBox", "dataBoxId");
                let { coll: board, ids: boardMapper } = await readAndGenerateId<BoardType>(realm, "Board", "boardId");
                let { coll: boardColumn, ids: boardColumnMapper } = await readAndGenerateId<BoardColumnType>(realm, "BoardColumn", "columnId");
                let { coll: boardZone, ids: boardZoneMapper } = await readAndGenerateId<BoardZoneType>(realm, "BoardZone", "zoneId");
                let { coll: boardCard, ids: boardCardMapper } = await readAndGenerateId<BoardCardType>(realm, "BoardCard", "cardId");
                let { coll: cardText, ids: cardTextMapper } = await readAndGenerateId<CardTextType>(realm, "CardText", "cardTextId");
                let { coll: summaryPostIt, ids: summaryPostItMapper } = await readAndGenerateId<SummaryPostItType>(realm, "SummaryPostIt", "postItId");
                let { coll: graph, ids: graphMapper } = await readAndGenerateId<GraphType>(realm, "Graph", "graphId");
                let { coll: preEventChecklist, ids: preEventChecklistMapper } = await readAndGenerateId<PreEventChecklistType>(realm, "PreEventChecklist", "id");
                let { coll: eventWeek, ids: eventWeekMapper } = await readAndGenerateId<EventWeekType>(realm, "EventWeek", "zoneId");
                let { coll: eventTask, ids: eventTaskMapper } = await readAndGenerateId<EventTaskType>(realm, "EventTask", "cardId");
                let { coll: comment, ids: commentMapper } = await readAndGenerateId<CommentType>(realm, "Comment", "commentId");
                let { coll: persona, ids: personaMapper } = await readAndGenerateId<PersonaType>(realm, "Persona", "personaId");
                let { coll: compositeCard, ids: compositeCardMapper } = await readAndGenerateId<CompositeCardType>(realm, "CompositeCard", "compositeId");
                let { coll: general, ids: generalMapper } = await readAndGenerateId<GeneralType>(realm, "General", "generalId");
                let { coll: metadataObject, ids: metadataObjectMapper } = await readAndGenerateId<MetadataObjectType>(realm, "MetadataObject", "objectId");
                let { coll: files, ids: fileMapper } = await readAndGenerateId<FileType>(realm, "File", "fileId");
                let { coll: goals, ids: goalMapper } = await readAndGenerateId<GoalType>(realm, "Goal", "goalId");
                let { coll: selects, ids: selectMapper } = await readAndGenerateId<SelectType>(realm, "Select", "selectId");
                let { coll: scorecard, ids: scoreCardMapper } = await readAndGenerateId<ScorecardType>(realm, "Scorecard", "scorecardId");
                let { coll: kpiList, ids: KPIMapper } = await readAndGenerateId<KPIType>(realm, "KPI", "id");
                let { coll: templateObjects, ids: templateMetaDataMapper } = await readAndGenerateId<TemplateMetaDataType>(realm, "TemplateMetadata", "templateId");
                //Composite Card 
                const allIds = {
                    ...actionMapper,
                    ...participantMapper,
                    ...textGoalMapper,
                    ...magnetsMapper,
                    ...labelMapper,
                    ...XMatrixTriangleMapper,
                    ...XMatrixGoalMapper,
                    ...majorMinorMapper,
                    ...brainstormMapper,
                    ...postItMapper,
                    ...zoneMapper,
                    ...dataBoxMapper,
                    ...boardMapper,
                    ...boardColumnMapper,
                    ...templateMetaDataMapper,
                    ...KPIMapper,
                    ...scoreCardMapper,
                    ...selectMapper,
                    ...goalMapper,
                    ...fileMapper,
                    ...generalMapper,
                    ...compositeCardMapper,
                    ...personaMapper,
                    ...commentMapper,
                    ...eventTaskMapper,
                    ...eventWeekMapper,
                    ...preEventChecklistMapper,
                    ...graphMapper,
                    ...summaryPostItMapper,
                    ...cardTextMapper,
                    ...boardCardMapper,
                    ...boardZoneMapper
                };

                //BoardCard
                const mapLinkId = (type: string, id: any): any => {
                    let _id: any = null;
                    if (id) {
                        switch (type) {
                            case "Chart":
                                _id = graphMapper[id] || null;
                                break;
                            case "Improvement Theme Text":
                            case "Summary Text":
                                _id = cardTextMapper[id] || null;
                                break;
                            case "Baseline Metric":
                                _id = goalMapper[id] || null;;
                                break;
                            case "Improvement Theme Brainstorm":
                                _id = brainstormMapper[id] || null;
                                break;
                            case "Brainstorm":
                                _id = brainstormMapper[id]
                                if (!_id) {
                                    _id = zoneMapper[id] || null;
                                }
                                break;
                            case "Brainstorm Card List":
                                _id = zoneMapper[id] || null;
                                break;
                            case "Persona Hill Statement":
                            case "Persona Empathy Map":
                            case "Persona":
                                _id = personaMapper[id] || null;
                                break;

                            case "Table":
                                _id = dataBoxMapper[id] || null;
                                break;
                            case "Image":
                                _id = fileMapper[id] || null;
                                break;
                            case "Goal Slider Actual":
                            case "Goal Slider Aim":
                                _id = goalMapper[id] || null;
                                break;
                            case "Text Goal Aim":
                            case "Text Goal Actual":
                            case "Text Goal":
                                _id = textGoalMapper[id] || null;
                                break;
                            case "Composite Card":
                                _id = boardCardMapper[id] || null;
                                break;
                            case "Action":
                                _id = actionMapper[id] || null;
                                break;

                            case "General Card":
                                _id = generalMapper[id] || null;
                                break;
                            case "Text":
                                _id = cardTextMapper[id] || null;
                                break;
                            case "Brainstorm Item":
                                _id = postItMapper[id] || null;
                                if (!_id) {
                                    _id = goalMapper[id] || null;
                                }
                                break;
                            case "Goal Scorecard Run-Rate":
                            case "Goal Scorecard Run-Rate Achieve":
                            case "Goal Scorecard Cumulative":
                            case "Goal Scorecard Achieve":
                                _id = scoreCardMapper[id] || null;
                                break;

                            case "Summary Box Product":
                            case "Summary Box Info":
                                _id = brainstormMapper[id] || null;
                                break;



                        }
                    }
                    return _id;
                }



                const kpiResultsCollection = db.collection("KPIResults");
                //Files
                const fileCollection = db.collection("File");
                files = files.map((o: FileType) => {
                    let n = o as N_FileType;
                    n._id = fileMapper[o.fileId];
                    n._partition = _partition;
                    return n;
                })
                if (files.length > 0) {
                    await fileCollection.insertMany(files);
                }

                //Graph
                const graphColl = db.collection("Graph");
                graph = graph.map((o: GraphType) => {
                    let n = o as N_GraphType;
                    n._id = graphMapper[o.graphId];
                    if (n.owner) {
                        n.owner = n.owner.replace("_", "|");
                    }
                    n._partition = _partition;
                    n.allData = o.allData.map((a) => ({ ...a, _id: new ObjectID() }))
                    return n;
                })
                if (graph.length > 0) {
                    await graphColl.insertMany(graph);
                }

                //KPI
                const RevenueCollection = db.collection("Revenue");
                const KPICollection = db.collection("KPI");
                const FormulaCollection = db.collection("Formula");
                const kpis: any = [];
                await asyncForEach(kpiList, async (kpi: any) => {

                    //transform Recurring Revenue
                    if (kpi.recurring) {
                        const _id = new ObjectID()
                        let recurring = kpi.recurring as N_RevenueType;
                        recurring._id = _id
                        recurring._partition = _partition;
                        // recurring = omit(["id"], recurring);
                        if (recurring.formula) {
                            const _id = new ObjectID();
                            let formula = recurring.formula as N_FormulaType;
                            formula._id = _id;
                            formula._partition = _partition;
                            // formula = omit(["id"], formula);
                            await FormulaCollection.insertOne(formula);
                            recurring.formula = _id;
                        }
                        await RevenueCollection.insertOne(recurring);
                        kpi.recurring = _id;
                    }
                    //transform Non Recurring Revenue
                    if (kpi.nonRecurring) {
                        const _id = new ObjectID()
                        let nonRecurring = kpi.nonRecurring as N_RevenueType;
                        nonRecurring._id = _id
                        nonRecurring._partition = _partition;
                        // nonRecurring = omit(["id"], nonRecurring);
                        if (nonRecurring.formula) {
                            const _id = new ObjectID();
                            let formula = nonRecurring.formula as N_FormulaType;
                            formula._id = _id;
                            formula._partition = _partition;
                            // formula = omit(["id"], formula);
                            await FormulaCollection.insertOne(formula);
                            nonRecurring.formula = _id;
                        }
                        await RevenueCollection.insertOne(nonRecurring);
                        kpi.nonRecurring = _id;
                    }
                    kpi._id = new ObjectID();
                    kpi.kpiId = kpi.id;
                    // kpi = omit(["id"], kpi);
                    kpi._partition = _partition
                    kpis.push(kpi._id);
                    await KPICollection.insertOne(kpi);
                });


                //XMatrix
                const xmatricColl = db.collection("XMatrix");
                xMatrixs = xMatrixs.map((o: XMatrixType) => {
                    let n = o as any;
                    n._id = boardCardMapper[o.xMatrixId];
                    n._partition = _partition;
                    n.left = XMatrixTriangleMapper[o.left.xMatrixTriangleId];
                    n.top = XMatrixTriangleMapper[o.top.xMatrixTriangleId];
                    n.right = XMatrixTriangleMapper[o.right.xMatrixTriangleId];
                    n.bottom = XMatrixTriangleMapper[o.bottom.xMatrixTriangleId];
                    if (n.template) {
                        n.template = templateMetaDataMapper[o.template.templateId];
                    }

                    if (n.step2RejectedBy) {
                        n.step2RejectedBy = participantMapper[n.step2RejectedBy.email]
                    }

                    if (n.step2ApprovedBy) {
                        n.step2ApprovedBy = participantMapper[n.step2ApprovedBy.email]
                    }

                    if (n.step3ApprovedBy) {
                        n.step3ApprovedBy = participantMapper[n.step3ApprovedBy.email]
                    }
                    n.participantList = o.participantList.map((p) => participantMapper[p.email])
                    // n.allData = o.allData.map((a) => ({ ...a, _id: new ObjectID() }))
                    return n;
                })
                if (xMatrixs.length > 0) {
                    await xmatricColl.insertMany(xMatrixs);
                }

                // XMatrix
                const xmatricTriangleColl = db.collection("XMatrixTriangle");
                xMatrixTriangles = xMatrixTriangles.map((o: XMatrixTriangleType) => {
                    let n = o as any;
                    n._id = XMatrixTriangleMapper[o.xMatrixTriangleId];
                    n._partition = _partition;

                    n.linkedTriangle = o.linkedTriangle ? XMatrixTriangleMapper[o.linkedTriangle.xMatrixTriangleId] : null;
                    n.brainstorm = o.brainstorm ? brainstormMapper[o.brainstorm.brainstormId] : null;

                    n.goals = o.goals.map((g) => {
                        let _id = null;
                        _id = goalMapper[g.xMatrixGoalId];
                        if (!_id) {
                            _id = postItMapper[g.xMatrixGoalId];
                        }
                        return _id || XMatrixGoalMapper[g.xMatrixGoalId];
                    });
                    // n.allData = o.allData.map((a) => ({ ...a, _id: new ObjectID() }))
                    return n;
                })
                if (xMatrixTriangles.length > 0) {
                    await xmatricTriangleColl.insertMany(xMatrixTriangles);
                }



                //XMatrix
                const XMatrixGoalColl = db.collection("XMatrixGoal");
                XMatrixGoals = XMatrixGoals.map((o: XMatrixGoalType) => {
                    let n = o as any;
                    let _id = null;
                    _id = goalMapper[o.xMatrixGoalId];
                    if (!_id) {
                        _id = postItMapper[o.xMatrixGoalId];
                    }
                    n._id = _id || XMatrixGoalMapper[o.xMatrixGoalId];
                    n._partition = _partition;

                    n.goal = o.goal ? goalMapper[o.goal.goalId] : null;
                    n.primary = o.primary ? actionMapper[o.primary.actionId] : null;
                    n.secondary = o.secondary.map((g) => actionMapper[g.actionId]);
                    n.majorMinors = o.majorMinors.map((g) => majorMinorMapper[g.majorMinorId]);
                    // n.allData = o.allData.map((a) => ({ ...a, _id: new ObjectID() }))
                    return n;
                })
                if (XMatrixGoals.length > 0) {
                    await XMatrixGoalColl.insertMany(XMatrixGoals);
                }


                //DataBox
                const databoxColl = db.collection("DataBox");
                dataBox = dataBox.map((o: DataBoxType) => {
                    let n = o as N_DataBoxType;
                    n._id = dataBoxMapper[o.dataBoxId];
                    n._partition = _partition;
                    n.rowsForBox = o.rowsForBox.map((x) => ({ ...x, _id: new ObjectID() }))
                    return n;
                })
                if (dataBox.length > 0) {
                    await databoxColl.insertMany(dataBox);
                }


                //Board
                const boardColl = db.collection("Board");
                board = board.map((o: BoardType) => {
                    let n = o as N_BoardType;
                    n._id = boardMapper[o.boardId];
                    n._partition = _partition;
                    n.checklist = o.checklist.map((c) => preEventChecklistMapper[c.id]);
                    n.columns = o.columns.map((c) => boardColumnMapper[c.columnId]);
                    return n;
                })
                if (board.length > 0) {
                    await boardColl.insertMany(board);
                }

                //Board Column
                const boardColumnColl = db.collection("BoardColumn");
                boardColumn = boardColumn.map((o: BoardColumnType) => {
                    let n = o as N_BoardColumnType;
                    n._id = boardColumnMapper[o.columnId];
                    n._partition = _partition;
                    n.zones = o.zones.map((o) => {
                        let _id = zoneMapper[o.zoneId];
                        if (!_id) {
                            _id = boardZoneMapper[o.zoneId];
                        }
                        return _id;
                    });
                    return n;
                })
                if (boardColumn.length > 0) {
                    await boardColumnColl.insertMany(boardColumn);
                }


                //Board Zone
                const boardZoneColl = db.collection("BoardZone");
                boardZone = boardZone.map((o: BoardZoneType) => {
                    let n = o as N_BoardZoneType;
                    let _id = null;
                    _id = zoneMapper[o.zoneId];
                    if (!_id) {
                        _id = boardZoneMapper[o.zoneId];
                    }
                    n._id = _id
                    n._partition = _partition;
                    n.cards = o.cards.map((x) => boardCardMapper[x.cardId]);
                    n.linkages = o.linkages.map((l: N_BoardZoneLinkType) => {
                        l._id = new ObjectID()
                        if (l.zone) {
                            l.zone = zoneMapper[l.zone.zoneId];
                        }
                        if (l.composite) {
                            const composite: any = l.composite;
                            composite._id = new ObjectID();
                            composite.cards = composite.cards.map((c: any) => ({ ...c, _id: new ObjectID() }))
                            l.composite = composite;
                        }
                    })
                    if (n.settings) {
                        const settings: any = n.settings;
                        settings._id = new ObjectID();
                        if (n.settings.measureSeeSaySettings) {
                            settings.measureSeeSaySettings = {
                                ...n.settings.measureSeeSaySettings,
                                _id: new ObjectID()
                            }
                        }
                        settings.compositeTypes = n.settings.compositeTypes.map((y: any) => {
                            y.cards = y.cards.map((c: any) => ({ ...c, _id: new ObjectID() }))
                            return { ...y, _id: new ObjectID() }
                        })
                        n.settings = settings;
                    }
                    return n;
                })
                if (boardZone.length > 0) {
                    await boardZoneColl.insertMany(boardZone);
                }

                //Graph
                const generalColl = db.collection("General");
                general = general.map((o: GeneralType) => {
                    let n = o as N_GeneralType;
                    n._id = generalMapper[o.generalId];
                    n._partition = _partition;
                    if (n.card) {
                        n.card = boardCardMapper[o.card.cardId];
                    }
                    return n;
                })
                if (general.length > 0) {
                    await generalColl.insertMany(general);
                }

                //CardText
                const cardTextCall = db.collection("CardText");
                cardText = cardText.map((o: CardTextType) => {
                    let n = o as N_CardTextType;
                    n._id = cardTextMapper[o.cardTextId];
                    n._partition = _partition;

                    return n;
                })
                if (cardText.length > 0) {
                    await cardTextCall.insertMany(cardText);
                }

                //Preevent Checklist
                const preeventCheckListColl = db.collection("PreEventChecklist");
                preEventChecklist = preEventChecklist.map((o: PreEventChecklistType) => {
                    let n = o as N_PreeventChecklistType;
                    n._id = preEventChecklistMapper[o.id];
                    n._partition = _partition;
                    n.zones = o.zones.map((z) => eventWeekMapper[z.zoneId]);
                    return n;
                })
                if (preEventChecklist.length > 0) {
                    await preeventCheckListColl.insertMany(preEventChecklist);
                }


                //Matadata object
                const metaObjectColl = db.collection("MetadataObject");
                metadataObject = metadataObject.map((o: MetadataObjectType) => {
                    let n = o as N_MetaObjectType;
                    n._id = allIds[o.objectId];
                    n._partition = _partition;
                    return n;
                })
                if (metadataObject.length > 0) {
                    await metaObjectColl.insertMany(metadataObject);
                }

                //Composite Card
                const compositeCardColl = db.collection("CompositeCard");
                compositeCard = compositeCard.map((o: CompositeCardType) => {
                    let n = o as N_CompositeCardType;
                    n._id = compositeCardMapper[o.compositeId];
                    n._partition = _partition;
                    if (n.linkId) {
                        n.linkId = boardCardMapper[n.linkId];
                    }
                    n.cards = o.cards.map((c) => boardCardMapper[c.cardId]);
                    return n;
                })
                if (compositeCard.length > 0) {
                    await compositeCardColl.insertMany(compositeCard);
                }

                //Board Card.
                const boardCardColl = db.collection("BoardCard");
                boardCard = boardCard.map((o: BoardCardType) => {
                    let n = o as N_BoardCardType;
                    n._id = boardCardMapper[o.cardId];
                    n._partition = _partition;
                    n.linkId = mapLinkId(n.type, n.linkId);


                    if (n.settings) {
                        const settings: any = n.settings;
                        settings._id = new ObjectID();
                        if (n.settings.measureSeeSaySettings) {
                            settings.measureSeeSaySettings = {
                                ...n.settings.measureSeeSaySettings,
                                _id: new ObjectID()
                            }
                        }
                        settings.compositeTypes = n.settings.compositeTypes.map(x => ({ ...x, _id: new ObjectID() }))
                        n.settings = settings;
                    }
                    return n;
                })
                if (boardCard.length > 0) {
                    await boardCardColl.insertMany(boardCard);
                }

                //Zone
                const zoneColl = db.collection("Zone");
                zone = zone.map((o: ZoneType) => {
                    let n = o as N_ZoneType;
                    n._id = zoneMapper[o.zoneId];
                    n._partition = _partition;
                    if (n.backgroundImage) {
                        n.backgroundImage = fileMapper[o.backgroundImage.fileId];
                    }
                    if (n.icon) {
                        n.icon._id = new ObjectID();
                    }

                    return n;
                })
                if (zone.length > 0) {
                    await zoneColl.insertMany(zone);
                }

                //Select
                const selectCollection = db.collection("Select");
                selects = selects.map((o: SelectType) => {
                    let n = o as N_SelectType;
                    n._id = selectMapper[o.selectId];
                    n._partition = _partition;
                    return n;
                })
                if (selects.length > 0) {
                    await selectCollection.insertMany(selects);
                }


                // Migrate Actions & Participants:
                const actionCollection = db.collection("Action");
                await asyncForEach(actions, async (action: ActionType) => {
                    let newAction: N_ActionType = action as N_ActionType;
                    newAction._id = actionMapper[action.actionId];
                    newAction._partition = _partition;
                    newAction.assignees = newAction.assignees.map((p) => participantMapper[p.email])
                    // newAction = omit(["actionId"], newAction)
                    await actionCollection.insertOne(newAction);
                })
                //Participants
                const wParticipantCollection = db.collection("WorkshopParticipant");
                await asyncForEach(workshopParticipants, async (participant: WorkshopParticipantType) => {
                    let newParticipant: N_WorkshopParticipantType = participant as N_WorkshopParticipantType;
                    newParticipant._id = participantMapper[participant.email];
                    newParticipant._partition = _partition;
                    newParticipant.actions = newParticipant.actions.map((a) => actionMapper[a.actionId])
                    if (newParticipant.identity) {
                        newParticipant.identity = newParticipant.identity.replace("_", "|");
                    }
                    // newParticipant = omit(["id"], newParticipant)
                    try {
                        await wParticipantCollection.insertOne(newParticipant);
                    } catch (e) {

                    }

                })

                //Magnets
                const magnetCollection = db.collection("Magnet");
                magnets = magnets.map((o: MagnetType) => {
                    let n = o as N_MagnetType;
                    n._id = magnetsMapper[o.id];
                    n._partition = _partition;
                    return n;
                })
                if (magnets.length > 0) {
                    await magnetCollection.insertMany(magnets);
                }
                //TextGoal
                const textGoalCollection = db.collection("TextGoal");
                textGoals = textGoals.map((o: TextGoalType) => {
                    let n = o as N_TextGoalType;
                    n._id = textGoalMapper[o.textGoalId];
                    n._partition = _partition;
                    return n;
                })
                if (textGoals.length > 0) {
                    await textGoalCollection.insertMany(textGoals);
                }
                //Label
                const labelCollection = db.collection("Label");
                const l: any = label.map((o: LabelType) => {
                    let n = o as N_LabelType;
                    n._id = labelMapper[o._id];
                    n._partition = _partition;
                    return n;
                })
                if (label.length > 0) {
                    await labelCollection.insertMany(l);
                }

                //MajorMinor
                const majorMinorColl = db.collection("MajorMinor");
                majorMinor = majorMinor.map((o: MajorMinorType) => {
                    let n = o as N_MajorMinorType;
                    n._id = majorMinorMapper[o.majorMinorId];
                    n._partition = _partition;
                    let linkGoalId = goalMapper[o.linkedGoalId];
                    if (!linkGoalId) {
                        linkGoalId = postItMapper[o.linkedGoalId];
                    }
                    n.linkedGoalId = linkGoalId;
                    return n;
                })
                if (majorMinor.length > 0) {
                    await majorMinorColl.insertMany(majorMinor);
                }

                //Persona
                const personaCollection = db.collection("Persona");
                persona = persona.map((p: PersonaType) => {
                    let nP = p as N_PersonaType;
                    nP._id = personaMapper[p.personaId];
                    nP._partition = _partition;
                    nP.name = p.name.map((cT) => cardTextMapper[cT.cardTextId]);
                    nP.description = p.description.map((d) => brainstormMapper[d.brainstormId]);
                    nP.empathyMap = p.empathyMap.map(e => brainstormMapper[e.brainstormId]);
                    nP.hillStatements = p.hillStatements.map(h => brainstormMapper[h.brainstormId]);
                    if (nP.image) {
                        nP.image = fileMapper[p.image.fileId];
                    }
                    // nP = omit(["personaId"], nP)
                    return nP;
                });
                if (persona.length > 0) {
                    await personaCollection.insertMany(persona);
                }

                //BrianStrom
                const brianstromCollection = db.collection("Brainstorm");
                brainstorm = brainstorm.map((b: BrainstormType) => {
                    let n = b as N_BrainstromType;
                    n._id = brainstormMapper[n.brainstormId];
                    n._partition = _partition;
                    n.postIts = b.postIts.map((p) => postItMapper[p.postItId]);
                    n.summaryPostIts = b.summaryPostIts.map((s) => summaryPostItMapper[s.postItId])
                    n.zones = b.zones.map((z) => zoneMapper[z.zoneId])
                    n.goals = b.goals.map((g) => goalMapper[g.goalId]);
                    n.axis = b.axis.map((a) => {
                        a.xAxis = a.xAxis.map((x) => {
                            x.points = x.points.map((p) => {
                                return { ...p, _id: new ObjectID() }
                            })
                            return { ...x, _id: new ObjectID() }
                        })
                        a.yAxis = a.yAxis.map((x) => {
                            x.points = x.points.map((p) => {
                                return { ...p, _id: new ObjectID() }
                            })
                            return { ...x, _id: new ObjectID() }
                        })
                        return { ...a, _id: new ObjectID() }
                    });
                    return n;
                })
                if (brainstorm.length > 0) {
                    await brianstromCollection.insertMany(brainstorm);
                }


                //Post it
                const postItCollection = db.collection("PostIt");
                postIt = postIt.map((o: PostItType) => {
                    let n = o as N_PostItType;
                    n._id = postItMapper[o.postItId];
                    n._partition = _partition;
                    n.list = o.list.map((l) => selectMapper[l.selectId]);
                    if (n.link) {
                        n.link = { ...o.link, _id: new ObjectID() }
                    }
                    if (n.file) {
                        n.file = fileMapper[o.file.fileId];
                    }
                    if (n.audioRecording) {
                        n.audioRecording = fileMapper[o.audioRecording.fileId];
                    }
                    if (n.videoRecording) {
                        n.videoRecording = fileMapper[o.videoRecording.fileId];
                    }
                    if (n.image) {
                        n.image = fileMapper[o.image.fileId];
                    }
                    if (n.icon) {
                        n.icon = { ...n.icon, _id: new ObjectID() }
                    }
                    if (n.magnet) {
                        n.magnet = magnetsMapper[o.magnet.id];
                    }
                    if (n.zoneId) {
                        n.zoneId = zoneMapper[o.zoneId]
                    }
                    if (n.owner) {
                        n.owner = n.owner.replace("_", "|");
                    }
                    return n;
                })
                if (postIt.length > 0) {
                    await postItCollection.insertMany(postIt);
                }


                //Summart Post it
                const summaryPostitCollection = db.collection("SummaryPostIt");
                summaryPostIt = summaryPostIt.map((o: SummaryPostItType) => {
                    let n = o as N_SummaryPostItType;
                    n._id = summaryPostItMapper[o.postItId];
                    n._partition = _partition;
                    n.cardId = n.cardId ? boardCardMapper[n.cardId] : null;
                    if (n.zoneId) {
                        n.zoneId = zoneMapper[o.zoneId]
                    }
                    if (n.owner) {
                        n.owner = n.owner.replace("_", "|");
                    }
                    return n;
                })
                if (summaryPostIt.length > 0) {
                    await summaryPostitCollection.insertMany(summaryPostIt);
                }

                //Comment
                const commentCollection = db.collection("Comment");
                comment = comment.map((o: CommentType) => {
                    let n = o as N_CommentType;
                    n._id = commentMapper[o.id];
                    n._partition = _partition;
                    n.commentId = new ObjectID();
                    if (n.taskId) {
                        n.taskId = eventTaskMapper[o.taskId];
                    }
                    if (n.userCommented) {
                        n.userCommented = participantMapper[o.userCommented.email];
                    }
                    n.replies = o.replies.map((r) => commentMapper[r.id]);
                    n.mentions = o.mentions.map((m) => participantMapper[m.email]);
                    n.emoticons = o.emoticons.map((e) => {
                        e.participant = participantMapper[e.participant.email];
                        let _id = new ObjectID()
                        e.reactionId = _id
                        return { ...e, _id }
                    })
                    return n;
                })
                if (comment.length > 0) {
                    await commentCollection.insertMany(comment);
                }

                //EventTask
                const eventCollection = db.collection("EventTask");
                eventTask = eventTask.map((o: EventTaskType) => {
                    let n = o as N_EventTaskType;
                    n._id = eventTaskMapper[o.cardId];
                    n._partition = _partition;
                    if (n.people) {
                        n.people = participantMapper[o.people.email];
                    }
                    n.comments = o.comments.map((c) => commentMapper[c.id]);
                    n.assignees = o.assignees.map((m) => participantMapper[m.email]);
                    n.attachments = o.attachments.map(f => fileMapper[f.fileId]);
                    n.labels = o.labels.map(l => labelMapper[l._id]);

                    if (n.linkedIssueId) {
                        n.linkedIssueId = eventTaskMapper[o.linkedIssueId] || null;
                    }
                    return n;
                })
                if (eventTask.length > 0) {
                    await eventCollection.insertMany(eventTask);
                }

                //EventWeek
                const eventweekCollection = db.collection("EventWeek");
                eventWeek = eventWeek.map((o: EventWeekType) => {
                    let n = o as N_EventWeekType;
                    n._id = eventWeekMapper[o.zoneId];
                    n.linkages = o.linkages.map((l: N_BoardZoneLinkType) => {
                        l._id = new ObjectID()
                        if (l.zone) {
                            l.zone = zoneMapper[l.zone.zoneId];
                        }
                        if (l.composite) {
                            const composite: any = l.composite;
                            composite._id = new ObjectID();
                            composite.cards = composite.cards.map((c: any) => ({ ...c, _id: new ObjectID() }))
                            l.composite = composite;
                        }
                    })
                    n._partition = _partition;
                    n.cards = o.cards.map((c) => eventTaskMapper[c.cardId]);
                    return n;
                })
                if (eventWeek.length > 0) {
                    await eventweekCollection.insertMany(eventWeek);
                }

                //ScoreCard
                const scorecardCollection = db.collection("Scorecard");
                scorecard = scorecard.map((o: ScorecardType) => {
                    let n = o as N_ScorecardType;
                    n._id = scoreCardMapper[o.scorecardId];
                    n._partition = _partition;
                    if (n.nonRecurringResults) {
                        let _id = new ObjectID();
                        kpiResultsCollection.insertOne({ ...n.nonRecurringResults, _partition: _partition, _id });
                        n.nonRecurringResults = _id;
                    }
                    if (n.recurringResults) {
                        let _id = new ObjectID();
                        kpiResultsCollection.insertOne({ ...n.recurringResults, _partition: _partition, _id });
                        n.recurringResults = _id;
                    }
                    return n;
                })
                if (scorecard.length > 0) {
                    await scorecardCollection.insertMany(scorecard);
                }

                //Goal
                const goalCollection = db.collection("Goal");
                goals = goals.map((o: GoalType) => {
                    let n = o as N_GoalType;
                    n._id = goalMapper[o.goalId];
                    n._partition = _partition;
                    if (n.kpi) {
                        n.kpi = KPIMapper[o.kpi.id];
                    }

                    if (n.nonRecurringResults) {
                        let _id = new ObjectID();
                        kpiResultsCollection.insertOne({ ...n.nonRecurringResults, _partition: _partition, _id });
                        n.nonRecurringResults = _id;
                    }
                    if (n.recurringResults) {
                        let _id = new ObjectID();
                        kpiResultsCollection.insertOne({ ...n.recurringResults, _partition: _partition, _id });
                        n.recurringResults = _id;
                    }
                    if (n.kpiResults) {
                        let _id = new ObjectID();
                        kpiResultsCollection.insertOne({ ...n.kpiResults, _partition: _partition, _id });
                        n.kpiResults = _id;
                    }
                    if (n.magnet) {
                        n.magnet = magnetsMapper[o.magnet.id];
                    }
                    if (n.postItId) {
                        n.postItId = postItMapper[n.postItId.postItId]
                    }
                    if (n.zoneId) {
                        n.zoneId = zoneMapper[n.zoneId.zoneId]
                    }
                    return n;
                })
                if (goals.length > 0) {
                    await goalCollection.insertMany(goals);
                }

                //TemplateMetaData.
                const templateCollection = db.collection("TemplateMetadata");

                templateObjects = templateObjects.map((o: TemplateMetaDataType) => {
                    const n = o as N_TemplateMetaDataType;
                    n._id = templateMetaDataMapper[o.templateId];
                    n._partition = _partition;
                    n.brainstorms = o.brainstorms.map((b) => brainstormMapper[b.brainstormId]);
                    n.graphs = o.graphs.map((g) => graphMapper[g.graphId]);
                    n.cardTexts = o.cardTexts.map(c => cardTextMapper[c.cardTextId]);
                    n.goalObjects = o.goalObjects.map((g) => goalMapper[g.goalId]);
                    n.baselineMetricObjects = o.baselineMetricObjects.map((g) => goalMapper[g.goalId]);
                    n.goalScorecardObjects = o.goalScorecardObjects.map(s => scoreCardMapper[s.scorecardId]);
                    n.dataBoxes = o.dataBoxes.map((d) => dataBoxMapper[d.dataBoxId]);
                    n.textGoals = o.textGoals.map(t => textGoalMapper[t.textGoalId]);
                    n.generalObject = o.generalObject.map(g => generalMapper[g.generalId]);
                    n.actions = o.actions.map(a => actionMapper[a.actionId]);
                    n.xMatrices = o.xMatrices.map(x => boardCardMapper[x.xMatrixId]);
                    if (n.settings) {
                        n.settings = { ...o.settings, _id: new ObjectID() };
                    }
                    n.personas = o.personas.map((p) => personaMapper[p.personaId]);
                    if (n.board) {
                        n.board = boardMapper[o.board.boardId];
                    }
                    n.labelList = o.labelList.map((l) => labelMapper[l._id]);

                    return n;
                });
                if (templateObjects.length > 0) {
                    await templateCollection.insertMany(templateObjects);
                }



                const workshopCollection = db.collection("Workshop");
                const idsCollection = idDb.collection('id');

                let companiesMapper = await idsCollection.findOne({ type: "company", "user.id": user.id });
                if (companiesMapper) {
                    companiesMapper = companiesMapper.ids;
                }
                const o = workshopObject[0];
                const n = workshopObject[0] as N_WorkshopType;

                n._id = newWorkshopId,
                    n._partition = _partition;
                if (companiesMapper) {
                    n.company = companiesMapper[n.company];
                }
                if (n.facilitator) {
                    n.facilitator = n.facilitator.replace("_", "|");
                }
                n.participants = o.participants.map((p) => participantMapper[p.email]);
                n.templates = o.templates.map((t) => templateMetaDataMapper[t.templateId]);
                n.process = o.process.map(p => ({ ...p, _id: new ObjectID() }));
                n.tables = o.tables.map((t) => {
                    t.rows = t.rows.map((r) => {
                        r.value = r.value.map((d) => ({ ...d, _id: new ObjectID() }));
                        return { ...r, _id: new ObjectID() };
                    })
                    return { ...t, _id: ObjectID() };
                })
                n.workshopLocations = o.workshopLocations.map(l => {
                    return { ...l, _id: new ObjectID() }
                })
                n.columns = o.columns.map((c) => preEventChecklistMapper[c.id]);
                if (n.board) {
                    n.board = boardMapper[o.board.boardId];
                }
                n.objectList = [];// o.objectList.map((o) => allIds[o.objectId]);
                if (n.nonRecurringKPITotals) {
                    let _id = new ObjectID();
                    kpiResultsCollection.insertOne({ ...n.nonRecurringKPITotals, _partition: _partition, _id });
                    n.nonRecurringKPITotals = _id;
                }
                if (n.recurringKPITotals) {
                    let _id = new ObjectID();
                    kpiResultsCollection.insertOne({ ...n.recurringKPITotals, _partition: _partition, _id });
                    n.recurringKPITotals = _id;
                }
                if (n.breakthrough) {
                    const b = n.breakthrough;
                    b.level0Metadata = b.level0Metadata.map((s: any) => ({ ...s, _id: new ObjectID() }))
                    b.generalMetadata = b.generalMetadata.map((s: any) => ({ ...s, _id: new ObjectID() }))
                    b.level1Metadata = b.level1Metadata.map((s: any) => ({ ...s, _id: new ObjectID() }))
                    n.breakthrough = { ...b, _id: new ObjectID() }
                }
                n.labelList = o.labelList.map((l) => labelMapper[l._id]);
                await workshopCollection.insertOne(n);
                logger.info(
                    _partitionString ? `Migrating Workshop ${workshopId} for Everyday of everybay board ${newWorkshopId} successful.` : `Migrating Workshop ${workshopId} successful.`
                );
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
