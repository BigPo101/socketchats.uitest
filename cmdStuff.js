const ADMINS = [
    { username: "AnguloRecto", password: "dev", color: "#000000", rank: "Owner" },
    { username: "Fish", password: "admin", color: "#FF0000", rank: "Admin"},
];
  
const COMMANDS = [
    { prefix: "/cmd", rankReq: "Owner", message: "CMD!" },
    { prefix: "/failure", rankReq: "Admin", message: "LLL!" },
];
  
// Export tables
module.exports = { ADMINS, COMMANDS };