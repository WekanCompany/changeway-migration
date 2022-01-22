import { File } from "./common/File";
import { Formula } from "./common/Formula";
import { Revenue } from "./common/Revenue";
import { KPI } from "./common/KPI";

import { Notifications } from "./global/notifications";
import { GlobalUser } from "./global/users";

import { AccessToken } from "./user/AccessToken";
import { Company } from "./user/Company";
import { LicenseKey } from "./user/LicenseKey";
import { Profile } from "./user/Profile";
import { Setting } from "./user/Settings";
import { Workshop as UserWorkshops } from "./user/Workshop";

import { ColourPalette } from "./company/ColourPalette";
import { Company as Companies } from "./company/Company";
import { Division } from "./company/Division";
import { Employee } from "./company/Employee";
import { Location } from "./company/Location";
import { SingleTemplate } from "./company/SingleTemplate";
import { TemplateMetadata } from "./common/TemplateMetadata";
import { WorkshopTemplate } from "./company/WorkshopTemplate";
import { Magnet } from "./common/Magnet";
import { Label } from "./common/Label";
import { SettingsMetadata } from "./common/SettingsMetadata";
import { Participant } from "./common/Participant";
import { KPIResults } from "./common/KPIResults";
import { CKPI } from "./company/KPI";

import { Action } from "./workshop/Action";
import { Axis } from "./workshop/Axis";
import { AxisPoint } from "./workshop/AxisPoint";
import { Board } from "./workshop/Board";
import { BoardCard } from "./workshop/BoardCard";
import { BoardCell } from "./workshop/BoardCell";
import { BoardColumn } from "./workshop/BoardColumn";
import { BoardCompositeCardTypeSettings } from "./workshop/BoardCompositeCardTypeSettings";
import { BoardCompositeSettings } from "./workshop/BoardCompositeSettings";
import { BoardRow } from "./workshop/BoardRow";
import { BoardSettings } from "./workshop/BoardSettings";
import { BoardTable } from "./workshop/BoardTable";
import { BoardZone } from "./workshop/BoardZone";
import { BoardZoneLink } from "./workshop/BoardZoneLink";
import { Brainstorm } from "./workshop/Brainstorm";
import { BrainstormAxis } from "./workshop/BrainstormAxis";
import { BreakthroughMetadata } from "./workshop/BreakthroughMetadata";
import { CardText } from "./workshop/CardText";
import { Comment } from "./workshop/Comment";
import { CompositeCard } from "./workshop/CompositeCard";
import { DataBox } from "./workshop/DataBox";
import { DataForBox } from "./workshop/DataForBox";
import { DataForGraph } from "./workshop/DataForGraph";
import { EventTask } from "./workshop/EventTask";
import { EventWeek } from "./workshop/EventWeek";
import { General } from "./workshop/General";

import { Settings } from "./workshop/Settings";
import { Graph } from "./workshop/Graph";
import { Icon } from "./workshop/Icon";
import { MajorMinor } from "./workshop/MajorMinor";
import { MeasureSeeSaySettings } from "./workshop/MeasureSeeSaySettings";
import { MetadataObject } from "./workshop/MetadataObject";
import { Persona } from "./workshop/Persona";
import { PostIt } from "./workshop/PostIt";
import { PreEventChecklist } from "./workshop/PreEventChecklist";
import { Process } from "./workshop/Process";
import { Reaction } from "./workshop/Reaction";
import { SummaryPostIt } from "./workshop/SummaryPostIt";
import { TemplateLinker } from "./workshop/TemplateLinker";
import { TextGoal } from "./workshop/TextGoal";
import { Workshop } from "./workshop/Workshop";
import { WorkshopLocation } from "./workshop/WorkshopLocation";
import { WorkshopParticipant } from "./workshop/WorkshopPartitipant";
import { XMatrix } from "./workshop/XMatrix";
import { XMatrixGoal } from "./workshop/XMatrixGoal";
import { XMatrixTriangle } from "./workshop/XMatrixTriangle";
import { Zone } from "./workshop/Zone";
import { ZoneLinker } from "./workshop/ZoneLinker";
import { Data } from "./common/Data";
import { Goal } from "./common/Goal";
import { Link } from "./common/Link";
import { Row } from "./common/Row";
import { Select } from "./common/Select";
import { Table } from "./common/Table";
import { Scorecard } from "./common/Scorecard";
import { Contact } from "./common/Contact";
import { TemplateData } from "./company/TemplateData";
import { Config } from "./everyday/Config";
import { DailyData } from "./everyday/DailyData";
import { Dimension } from "./everyday/Dimension";
import { EverydayBoard } from "./everyday/EverydayBoard";
import { EverydayBoardInstructions } from "./everyday/EverydayBoardInstructions";
import { EverydayLevel } from "./everyday/EverydayLevel";
import { GraphSettings } from "./everyday/GraphSettings";
import { LineManager } from "./everyday/LineManager";
import { MissIssue } from "./everyday/MissIssue";
import { MissReason } from "./everyday/MissReason";
import { MonthlyData } from "./everyday/MonthlyData";
import { ParetoOfGaps } from "./everyday/ParetoOfGaps";
import { Plan } from "./everyday/Plan";
import { PlanValues } from "./everyday/PlanValues";
import { ReasonForMiss } from "./everyday/ReasonForMiss";
import { ShiftTiming } from "./everyday/ShiftTiming";
import { UserBoardList } from "./everyday/UserBoardList";
import { EverydayAction } from "./everyday/Action";



export const GlobalKPI = [Formula, Revenue, KPI];

export const GlobalUserAndNotification = [GlobalUser, Notifications];

export const UserSchema = [
    File,
    AccessToken,
    Company,
    LicenseKey,
    Profile,
    Setting,
    UserWorkshops,
];

export const CompanySchema = [
    File,
    Magnet,
    Label,
    SettingsMetadata,
    Participant,
    CKPI,
    Revenue,
    Formula,
    ColourPalette,
    Companies,
    Division,
    Employee,
    Location,
    SingleTemplate,
    WorkshopTemplate,
    TemplateData,
];

export const WorkshopSchema = [
    File,
    Data,
    Goal,
    Label,
    Link,
    Magnet,
    Row,
    Select,
    Table,
    SettingsMetadata,
    CKPI,
    Revenue,
    Formula,
    KPIResults,
    Action,
    Axis,
    AxisPoint,
    Board,
    BoardCard,
    BoardCell,
    BoardColumn,
    BoardCompositeCardTypeSettings,
    BoardCompositeSettings,
    BoardRow,
    BoardSettings,
    BoardTable,
    BoardZone,
    BoardZoneLink,
    Brainstorm,
    BrainstormAxis,
    BreakthroughMetadata,
    CardText,
    Comment,
    CompositeCard,
    DataBox,
    DataForBox,
    DataForGraph,
    EventTask,
    EventWeek,
    General,
    Graph,
    Icon,
    MajorMinor,
    MeasureSeeSaySettings,
    MetadataObject,
    Persona,
    PostIt,
    PreEventChecklist,
    Process,
    Reaction,
    Settings,
    SummaryPostIt,
    TemplateLinker,
    TextGoal,
    Workshop,
    WorkshopLocation,
    WorkshopParticipant,
    XMatrix,
    XMatrixGoal,
    XMatrixTriangle,
    Zone,
    ZoneLinker,
    TemplateMetadata,
    Scorecard,
    Contact
];

export const EverydaySchema = [
    Config,
    DailyData,
    Dimension,
    EverydayBoard,
    EverydayBoardInstructions,
    EverydayLevel,
    GraphSettings,
    LineManager,
    MissIssue,
    MissReason,
    MonthlyData,
    ParetoOfGaps,
    Plan,
    PlanValues,
    ReasonForMiss,
    ShiftTiming,
    UserBoardList,
    File,
    WorkshopParticipant,
    EventTask,
    Comment,
    Reaction,
    Label,
    EverydayAction
];


