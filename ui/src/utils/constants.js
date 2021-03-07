export const CURRENT_VERSION = '1.0.0'
export const API = 'http://ec2-18-195-114-103.eu-central-1.compute.amazonaws.com:3000/api/';

export const HEADERS = [
    { title: 'שם פרטי', key: "first_name", type: "string" }
    , { title: 'שם משפחה', key: "last_name" , type: "string"},
    { title: "שם האישה", key: "wife_name" , type: "string" },
    { title: "מס' מקומות", key: "places_count", type: "number" },
    { title: "מיקום במפה", key: "point_on_map" , type: "string"},
    { title: "הוראת קבע", key: "orat_keva" , type: "string"},
    { title: "סיום הוראת קבע", key: "orat_keva_end" , type: "string"},
    { title: "מחיר", key: "amount_per_place" , type: "number"},
    { title: "טלפון", key: "phone" , type: "string"},
    { title: 'ת"ז', key: "zeout" , type: "string"},
    { title: "כתובת", key: "address" , type: "string"},
    { title: "מייל", key: "email" , type: "string"},
    { title: 'גברים לר"ה', key: "mens_rosh_ashana" , type: "number"},
    { title: 'נשים לר"ה', key: "womens_rosh_ashana" , type: "number"},
    { title: 'גברים ליוכ"פ', key: "mens_kipur" , type: "number"},
    { title: 'נשים ליוכ"פ', key: "womens_kipur", type: "number" },
    { title: 'הערות', key: "comments" , type: "string"},
    { title: 'סה"כ', key: "sum" , type: "number"},
    { title: 'שולם', key: "paid_up" , type: "number"}
]