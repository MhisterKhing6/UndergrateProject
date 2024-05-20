
import { Program, Class, ClassCourses, Course, AssignmentClasses } from "../models/relationship/relations.js"
const programs = [ {prog: {"programName":"Computer Science", "programCode": "CSM","programDesc": "Teaches the Science of computing"},
                            classes: [{"className": "Computer Science 1", classCode: "CSM_1", ProgramId: "CSM"}, 
                            {"className": "Computer Science 2", classCode: "CSM_2", ProgramId: "CSM"},
                            {"className": "Computer Science 3", classCode: "CSM_3", ProgramId: "CSM"},
                            {"className": "Computer Science 4", classCode: "CSM_4", ProgramId: "CSM"}]
                        },

                    {prog: {"programName":"Acturial Science", "programCode": "ASM" ,"programDesc": "Teaches the Science of computing"}, classes : [{"className": "Acturial Science 1", classCode: "ASM_1", ProgramId: "ASM"},
                    {"className": "Acturial Science 2", classCode: "ASM_2", ProgramId: "ASM"},{"className": "Acturial Science 3", classCode: "ASM_3", ProgramId: "ASM"}, {"className": "Acturial Science 4", classCode: "ASM_4", ProgramId: "ASM"}
                ]},
                   {prog: {"programName":"Bilogical Science", "programCode": "BSM" ,"programDesc": "Teaches the Science of computing"},classes: [{"className": "Bilogical Science 1", classCode: "BSM_1", ProgramId: "BSM"},
                            {"className": "Bilogical Science 2", classCode: "BSM_2", ProgramId: "BSM"}, {"className": "Bilogical Science 3", classCode: "BSM_3", ProgramId: "BSM"}, {"className": "Bilogical Science 4", classCode: "BSM_4", ProgramId: "BSM"}
                            ]},
                   {prog: {"programName":"BioChemistry", "programCode": "DSM" ,"programDesc": "Teaches the Science of computing"}, classes:[{"className": "Bio Chemistry 1", classCode: "DSM_1", ProgramId: "DSM"},
                            {"className": "Bio Chemistry 1", classCode: "DSM_1", ProgramId: "DSM"} , {"className": "Bio Chemistry 3", classCode: "DSM_3", ProgramId: "DSM"}, {"className": "Bio Chemistry 4", classCode: "DSM_4", ProgramId: "DSM"}]},
                   {prog: {"programName":"Mathematics", "programCode": "MSM" ,"programDesc": "Teaches the Science of computing"}, classes: [{"className": "Mathematics 1", classCode: "MSM_1", ProgramId: "MSM"}, {"className": "Mathematics 2", classCode: "MSM_2", ProgramId: "MSM"}, {"className": "Mathematics 3", classCode: "MSM_3", ProgramId: "MSM"}, {"className": "Mathematics 3", classCode: "MSM_3", ProgramId: "MSM"}, {"className": "Mathematics 4", classCode: "MSM_4", ProgramId: "MSM"} ]},
                   {prog: {"programName":"Pharmacy", "programCode": "PHA" ,"programDesc": "Teaches the Science of computing"}, classes: [{"className": "Pharmacy 1", classCode: "PHA_1", ProgramId: "PHA"}, {"className": "Pharmacy 2", classCode: "PHA_2", ProgramId: "PHA"}, {"className": "Pharmacy 3", classCode: "PHA_3", ProgramId: "PHA"},
                   {"className": "Pharmacy 4", classCode: "PHA_4", ProgramId: "PHA"}, {"className": "Pharmacy 4", classCode: "PHA_4", ProgramId: "PHA"}, {"className": "Pharmacy 5", classCode: "PHA_5", ProgramId: "PHA"}, {"className": "Pharmacy 6", classCode: "PHA_6", ProgramId: "PHA"}]}
                ]
const courses = [
        {
            "courseName": "Introduction to Pharmacology",
            "courseCode": "IPH101",
            "programCode": "PHA",
            "classCode": "PHA_1"
        },
        {
            "courseName": "Pharmaceutical Chemistry",
            "courseCode": "PCH102",
            "programCode": "PHA",
            "classCode": "PHA_1"
        },
        {
            "courseName": "Pharmacokinetics",
            "courseCode": "PK103",
            "programCode": "PHA",
            "classCode": "PHA_2"
        },
        {
            "courseName": "Pharmacodynamics",
            "courseCode": "PD104",
            "programCode": "PHA",
            "classCode": "PHA_2"
        },
        {
            "courseName": "Clinical Pharmacology",
            "courseCode": "CP105",
            "programCode": "PHA",
            "classCode": "PHA_3"
        },
        {
            "courseName": "Pharmaceutical Analysis",
            "courseCode": "PA106",
            "programCode": "PHA",
            "classCode": "PHA_3"
        },
        {
            "courseName": "Pharmacotherapy",
            "courseCode": "PT107",
            "programCode": "PHA",
            "classCode": "PHA_4"
        },
        {
            "courseName": "Pharmaceutical Biotechnology",
            "courseCode": "PBT108",
            "programCode": "PHA",
            "classCode": "PHA_4"
        },
        {
            "courseName": "Clinical Pharmacy Practice",
            "courseCode": "CPP109",
            "programCode": "PHA",
            "classCode": "PHA_5"
        },
        {
            "courseName": "Pharmacy Management",
            "courseCode": "PM110",
            "programCode": "PHA",
            "classCode": "PHA_5"
        },
        {
            "courseName": "Pharmacovigilance",
            "courseCode": "PV111",
            "programCode": "PHA",
            "classCode": "PHA_6"
        },
        {
            "courseName": "Regulatory Affairs in Pharmacy",
            "courseCode": "RAP112",
            "programCode": "PHA",
            "classCode": "PHA_6"
        }
    
    ,{
            "courseName": "Media Studies Fundamentals",
            "courseCode": "MSF101",
            "programCode": "MSM",
            "classCode": "MSM_1"
        },
        {
            "courseName": "Journalism Principles",
            "courseCode": "JP102",
            "programCode": "MSM",
            "classCode": "MSM_1"
        },
        {
            "courseName": "Digital Communication Strategies",
            "courseCode": "DCS103",
            "programCode": "MSM",
            "classCode": "MSM_1"
        },
        {
            "courseName": "Film Studies",
            "courseCode": "FS104",
            "programCode": "MSM",
            "classCode": "MSM_1"
        },
        {
            "courseName": "Social Media Management",
            "courseCode": "SMM105",
            "programCode": "MSM",
            "classCode": "MSM_2"
        },
        {
            "courseName": "Advertising and Branding",
            "courseCode": "AB106",
            "programCode": "MSM",
            "classCode": "MSM_2"
        },
        {
            "courseName": "Public Relations Strategies",
            "courseCode": "PRS107",
            "programCode": "MSM",
            "classCode": "MSM_2"
        },
        {
            "courseName": "Broadcasting Techniques",
            "courseCode": "BT108",
            "programCode": "MSM",
            "classCode": "MSM_2"
        },
        {
            "courseName": "Digital Storytelling",
            "courseCode": "DS109",
            "programCode": "MSM",
            "classCode": "MSM_3"
        },
        {
            "courseName": "Media Ethics and Law",
            "courseCode": "MEL110",
            "programCode": "MSM",
            "classCode": "MSM_3"
        },
        {
            "courseName": "Cultural Studies",
            "courseCode": "CS111",
            "programCode": "MSM",
            "classCode": "MSM_3"
        },
        {
            "courseName": "Visual Communication Design",
            "courseCode": "VCD112",
            "programCode": "MSM",
            "classCode": "MSM_3"
        },
        {
            "courseName": "Media Research Methods",
            "courseCode": "MRM113",
            "programCode": "MSM",
            "classCode": "MSM_4"
        },
        {
            "courseName": "Media Production Techniques",
            "courseCode": "MPT114",
            "programCode": "MSM",
            "classCode": "MSM_4"
        },
        {
            "courseName": "Digital Marketing Strategies",
            "courseCode": "DMS115",
            "programCode": "MSM",
            "classCode": "MSM_4"
        },
        {
            "courseName": "Journalistic Writing",
            "courseCode": "JW116",
            "programCode": "MSM",
            "classCode": "MSM_4"
        }
    
    ,{
        "courseName": "Web Programming",
        "courseCode": "WP101",
        "programCode": "CSM",
        "classCode": "CSM_1"
    },
    {
        "courseName": "Mobile App Programming",
        "courseCode": "MAP102",
        "programCode": "CSM",
        "classCode": "CSM_1"
    },
    {
        "courseName": "Database Programming",
        "courseCode": "DBP103",
        "programCode": "CSM",
        "classCode": "CSM_1"
    },
    {
        "courseName": "Game Programming",
        "courseCode": "GP104",
        "programCode": "CSM",
        "classCode": "CSM_1"
    },
    {
        "courseName": "Advanced Web Programming",
        "courseCode": "AWP105",
        "programCode": "CSM",
        "classCode": "CSM_2"
    },
    {
        "courseName": "Advanced Mobile App Programming",
        "courseCode": "AMAP106",
        "programCode": "CSM",
        "classCode": "CSM_2"
    },
    {
        "courseName": "Advanced Database Programming",
        "courseCode": "ADBP107",
        "programCode": "CSM",
        "classCode": "CSM_2"
    },
    {
        "courseName": "Advanced Game Programming",
        "courseCode": "AGP108",
        "programCode": "CSM",
        "classCode": "CSM_2"
    },
    {
        "courseName": "Web Development",
        "courseCode": "WD109",
        "programCode": "CSM",
        "classCode": "CSM_3"
    },
    {
        "courseName": "Mobile App Development",
        "courseCode": "MAD110",
        "programCode": "CSM",
        "classCode": "CSM_3"
    },
    {
        "courseName": "Database Management",
        "courseCode": "DBM111",
        "programCode": "CSM",
        "classCode": "CSM_3"
    },
    {
        "courseName": "Game Design",
        "courseCode": "GD112",
        "programCode": "CSM",
        "classCode": "CSM_3"
    },
    {
        "courseName": "Web Security",
        "courseCode": "WS113",
        "programCode": "CSM",
        "classCode": "CSM_4"
    },
    {
        "courseName": "Mobile App Security",
        "courseCode": "MAS114",
        "programCode": "CSM",
        "classCode": "CSM_4"
    },
    {
        "courseName": "Database Security",
        "courseCode": "DBS115",
        "programCode": "CSM",
        "classCode": "CSM_4"
    },
    {
        "courseName": "Game Security",
        "courseCode": "GS116",
        "programCode": "CSM",
        "classCode": "CSM_4"
    },
    
        {
            "courseName": "Data Structures and Algorithms",
            "courseCode": "DSA101",
            "programCode": "ASM",
            "classCode": "ASM_1"
        },
        {
            "courseName": "Machine Learning Foundations",
            "courseCode": "MLF102",
            "programCode": "ASM",
            "classCode": "ASM_1"
        },
        {
            "courseName": "Web Application Development",
            "courseCode": "WAD103",
            "programCode": "ASM",
            "classCode": "ASM_1"
        },
        {
            "courseName": "Network Security Fundamentals",
            "courseCode": "NSF104",
            "programCode": "ASM",
            "classCode": "ASM_1"
        },
        {
            "courseName": "Cloud Computing Principles",
            "courseCode": "CCP105",
            "programCode": "ASM",
            "classCode": "ASM_2"
        },
        {
            "courseName": "Artificial Intelligence Essentials",
            "courseCode": "AIE106",
            "programCode": "ASM",
            "classCode": "ASM_2"
        },
        {
            "courseName": "Software Engineering Practices",
            "courseCode": "SEP107",
            "programCode": "ASM",
            "classCode": "ASM_2"
        },
        {
            "courseName": "Cybersecurity Management",
            "courseCode": "CSM108",
            "programCode": "ASM",
            "classCode": "ASM_2"
        },
        {
            "courseName": "Database Design and Implementation",
            "courseCode": "DDI109",
            "programCode": "ASM",
            "classCode": "ASM_3"
        },
        {
            "courseName": "Operating Systems Concepts",
            "courseCode": "OSC110",
            "programCode": "ASM",
            "classCode": "ASM_3"
        },
        {
            "courseName": "Software Testing and Quality Assurance",
            "courseCode": "STA111",
            "programCode": "ASM",
            "classCode": "ASM_3"
        },
        {
            "courseName": "Internet of Things Applications",
            "courseCode": "IOT112",
            "programCode": "ASM",
            "classCode": "ASM_3"
        },
        {
            "courseName": "Big Data Analytics",
            "courseCode": "BDA113",
            "programCode": "ASM",
            "classCode": "ASM_4"
        },
        {
            "courseName": "Blockchain Fundamentals",
            "courseCode": "BF114",
            "programCode": "ASM",
            "classCode": "ASM_4"
        },
        {
            "courseName": "Software Development Lifecycle",
            "courseCode": "SDLC115",
            "programCode": "ASM",
            "classCode": "ASM_4"
        },
        {
            "courseName": "Ethical Hacking Techniques",
            "courseCode": "EHT116",
            "programCode": "ASM",
            "classCode": "ASM_4"
        }, 
            {
                "courseName": "Data Science Fundamentals",
                "courseCode": "DSF101",
                "programCode": "DSM",
                "classCode": "DSM_1"
            },
            {
                "courseName": "Python Programming for Data Analysis",
                "courseCode": "PPDA102",
                "programCode": "DSM",
                "classCode": "DSM_1"
            },
            {
                "courseName": "Machine Learning Applications",
                "courseCode": "MLA103",
                "programCode": "DSM",
                "classCode": "DSM_1"
            },
            {
                "courseName": "Deep Learning Fundamentals",
                "courseCode": "DLF104",
                "programCode": "DSM",
                "classCode": "DSM_1"
            },
            {
                "courseName": "Big Data Processing Techniques",
                "courseCode": "BDPT105",
                "programCode": "DSM",
                "classCode": "DSM_2"
            },
            {
                "courseName": "Natural Language Processing",
                "courseCode": "NLP106",
                "programCode": "DSM",
                "classCode": "DSM_2"
            },
            {
                "courseName": "Data Visualization Techniques",
                "courseCode": "DVT107",
                "programCode": "DSM",
                "classCode": "DSM_2"
            },
            {
                "courseName": "Applied Statistics for Data Science",
                "courseCode": "ASDS108",
                "programCode": "DSM",
                "classCode": "DSM_2"
            },
            {
                "courseName": "Distributed Systems for Data Science",
                "courseCode": "DSDS109",
                "programCode": "DSM",
                "classCode": "DSM_3"
            },
            {
                "courseName": "Cloud Computing for Data Analytics",
                "courseCode": "CCDA110",
                "programCode": "DSM",
                "classCode": "DSM_3"
            },
            {
                "courseName": "Advanced Data Mining Techniques",
                "courseCode": "ADMT111",
                "programCode": "DSM",
                "classCode": "DSM_3"
            },
            {
                "courseName": "Cybersecurity for Data Scientists",
                "courseCode": "CSDS112",
                "programCode": "DSM",
                "classCode": "DSM_3"
            },
            {
                "courseName": "Data Engineering Principles",
                "courseCode": "DEP113",
                "programCode": "DSM",
                "classCode": "DSM_4"
            },
            {
                "courseName": "Time Series Analysis",
                "courseCode": "TSA114",
                "programCode": "DSM",
                "classCode": "DSM_4"
            },
            {
                "courseName": "Predictive Analytics",
                "courseCode": "PA115",
                "programCode": "DSM",
                "classCode": "DSM_4"
            },
            {
                "courseName": "Data Ethics and Privacy",
                "courseCode": "DEP116",
                "programCode": "DSM",
                "classCode": "DSM_4"
            },
                {
                    "courseName": "Business Management Fundamentals",
                    "courseCode": "BMF101",
                    "programCode": "BSM",
                    "classCode": "BSM_1"
                },
                {
                    "courseName": "Marketing Strategies",
                    "courseCode": "MS102",
                    "programCode": "BSM",
                    "classCode": "BSM_1"
                },
                {
                    "courseName": "Financial Accounting Principles",
                    "courseCode": "FAP103",
                    "programCode": "BSM",
                    "classCode": "BSM_1"
                },
                {
                    "courseName": "Organizational Behavior",
                    "courseCode": "OB104",
                    "programCode": "BSM",
                    "classCode": "BSM_1"
                },
                {
                    "courseName": "Human Resource Management",
                    "courseCode": "HRM105",
                    "programCode": "BSM",
                    "classCode": "BSM_2"
                },
                {
                    "courseName": "Business Law and Ethics",
                    "courseCode": "BLE106",
                    "programCode": "BSM",
                    "classCode": "BSM_2"
                },
                {
                    "courseName": "Operations Management",
                    "courseCode": "OM107",
                    "programCode": "BSM",
                    "classCode": "BSM_2"
                },
                {
                    "courseName": "Strategic Management",
                    "courseCode": "SM108",
                    "programCode": "BSM",
                    "classCode": "BSM_2"
                },
                {
                    "courseName": "Entrepreneurship and Innovation",
                    "courseCode": "EI109",
                    "programCode": "BSM",
                    "classCode": "BSM_3"
                },
                {
                    "courseName": "International Business",
                    "courseCode": "IB110",
                    "programCode": "BSM",
                    "classCode": "BSM_3"
                },
                {
                    "courseName": "Supply Chain Management",
                    "courseCode": "SCM111",
                    "programCode": "BSM",
                    "classCode": "BSM_3"
                },
                {
                    "courseName": "Business Analytics",
                    "courseCode": "BA112",
                    "programCode": "BSM",
                    "classCode": "BSM_3"
                },
                {
                    "courseName": "Project Management",
                    "courseCode": "PM113",
                    "programCode": "BSM",
                    "classCode": "BSM_4"
                },
                {
                    "courseName": "Leadership Development",
                    "courseCode": "LD114",
                    "programCode": "BSM",
                    "classCode": "BSM_4"
                },
                {
                    "courseName": "Corporate Finance",
                    "courseCode": "CF115",
                    "programCode": "BSM",
                    "classCode": "BSM_4"
                },
                {
                    "courseName": "Business Negotiation Strategies",
                    "courseCode": "BNS116",
                    "programCode": "BSM",
                    "classCode": "BSM_4"
                },
]

let classCourse = []
const loadPrograms = async () => {
    await Program.sync({alter: true})
    await Class.sync({alter: true})
    await Course.sync({alter: true})
    await ClassCourses.sync({alter:true})

   for (const {prog, classes} of programs) {
    let dbProgram = await Program.create(prog)
    for(const val of classes){
        val.ProgramId = dbProgram.id
        await Class.create(val)
    }
    //load classes
}
//load class
for(const val of courses) {
    //find program
    let program = await Program.find({"programCode": val.programCode})
    if(program) {
        val.ProgramId = program.id
        let programClass = await Class.find({"classCode": val.classCode})
        if(programClass) {
            let course = await Course.create(val)
            classCourse.push({"ClassId": programClass.id, "CourseId": course.id})
        }
    }

}
await ClassCourses.bulkCreate(classCourse)
}

export {loadPrograms}