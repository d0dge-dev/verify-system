const config = require("../../config");

function verifyProcess(securitycheck, member) {
    switch (securitycheck.action) {
        case "verify":
            // Add and remove roles form user defined at config.verify.roles
            for (const role of config.verify.roles.remove) {
                member.roles.remove(role);
            }
            for (const role of config.verify.roles.add) {
                console.log(role)
                member.roles.add(role);
            }
            // logtodc(securitycheck.action, securitycheck.reason, member)
            break;
    
        case "kick":
            // Kick user from guild
            member.kick(securitycheck.reason);
            // logtodc(securitycheck.action, securitycheck.reason, member)
            break;
        case "ban":
            // Ban user from guild
            member.ban({ reason: securitycheck.reason });
            // logtodc(securitycheck.action, securitycheck.reason, member)
            break;
        default:
            // logtodc(securitycheck.action, securitycheck.reason, member)
            break;
    }
}

module.exports = verifyProcess;