const ADMINS = [
    { username: "AnguloRecto", password: "dev", color: "#000000", rank: "Owner" },
    { username: "Fish", password: "admin", color: "#FF0000", rank: "Admin"},
    { username: "Big_Po101", password: "347eghalf", color: "#0080FE", rank: "Owner" }
];
  
const COMMANDS = [
    { prefix: "/cmd", rankReq: "Owner", script: `console.log("CMD!")`, target: false },
    { prefix: "/failure", rankReq: "Admin", script: "LLL!", target: false },
    { prefix: "/reload", rankReq: "Admin", script: `window.location.reload();`, target: true },
];

const RANKS = [
    { rank: "Owner", weight: 100 },
    { rank: "Dev", weight: 75 },
    { rank: "Admin", weight: 65 },
    { rank: "VIP", weight: 50 },
    // Add more ranks as needed
];
  
// Export tables
module.exports = { ADMINS, COMMANDS, RANKS };