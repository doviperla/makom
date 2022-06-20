module.exports = {
    cors: {
        whitelist: ['http://localhost:3000', 'http://ec2-3-64-131-64.eu-central-1.compute.amazonaws.com/']
    },
    sessionSecret: "shira_ayafa",
    tokenExpireTime: "3h",
    connection_string: "postgres://imedis_admin:1nc1d3nt4L@localhost:2744/makom"
}