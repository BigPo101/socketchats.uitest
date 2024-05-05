const ADMINS = [
    { username: "AnguloRecto", password: "dev", color: "#000000", rank: "Owner" },
    { username: "Fish", password: "admin", color: "#FF0000", rank: "Admin"},
    { username: "Big_Po101", password: "347eghalf", color: "#0000ff", rank: "Owner" }
];
  
const COMMANDS = [
    { prefix: "/cmd", rankReq: "Owner", message: "CMD!" },
    { prefix: "/failure", rankReq: "Admin", message: "LLL!" },
];
  
// Export tables
module.exports = { ADMINS, COMMANDS };