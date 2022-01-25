import ObjectID from "bson-objectid";
import { Db } from "mongodb";
import winston from "winston";
import { N_FormulaType } from "../models/mongodb-realm/common/Formula";
import { N_KPIType } from "../models/mongodb-realm/common/KPI";
import { N_RevenueType } from "../models/mongodb-realm/common/Revenue";
import { KPIType } from "../models/ros/common/KPI";
import { asyncForEach, omit, readRealm } from "../utils";

const MigrateGlobalKPI = (realm: any, db: Db, logger: winston.Logger, idDb: Db) => {
    return new Promise(async (resolve, reject) => {
        try {
            //Get All the KPI's 
            const kpis: N_KPIType[] = await readRealm<KPIType>(
                realm,
                "KPI"
            ) as N_KPIType[];

            const KPICollection = db.collection("KPI");
            const RevenueCollection = db.collection("Revenue")
            const FormulaCollection = db.collection("Formula")
            const KPIIDCollection = idDb.collection("id");
            const kpiIds: any = {};
            if (kpis && kpis.length > 0) {
                logger.info(
                    `Migration totally ${kpis.length} KPI's and its Revenue and formula's.`
                );
                await asyncForEach(kpis, async (kpi: N_KPIType) => {
                    //transform Recurring Revenue
                    if (kpi.recurring) {
                        const _id = new ObjectID()
                        let recurring = kpi.recurring as N_RevenueType;
                        recurring._id = _id
                        recurring._partition = "global";
                        recurring = omit(["id"], recurring);
                        if (recurring.formula) {
                            const _id = new ObjectID();
                            let formula = recurring.formula as N_FormulaType;
                            formula._id = _id;
                            formula._partition =  "global";
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
                        nonRecurring._partition = "global";
                        nonRecurring = omit(["id"], nonRecurring);
                        if (nonRecurring.formula) {
                            const _id = new ObjectID();
                            let formula = nonRecurring.formula as N_FormulaType;
                            formula._id = _id;
                            formula._partition =  "global";
                            await FormulaCollection.insertOne(formula);
                            nonRecurring.formula = _id;
                        }
                        await RevenueCollection.insertOne(nonRecurring);
                        kpi.nonRecurring = _id;
                    }
                    kpi._id = new ObjectID();
                    kpiIds[kpi.id] = kpi._id;
                    kpi = omit(["id"], kpi);
                    kpi._partition = "global";
                    await KPICollection.insertOne(kpi);
                });
                await KPIIDCollection.insertOne({ type: "kpi", ids: kpiIds, user: null });
                logger.info(
                    `Done migration of KPI's and its Revenue and formula.`
                );
            } else {
                logger.error(
                    `Nothing to migrate on KPI realm path.`
                );
            }
            resolve(true)

        } catch (e) {
            reject(e)
        }
    })
}

export default MigrateGlobalKPI;