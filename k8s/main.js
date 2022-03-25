"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyChart = void 0;
const kittyhawk_1 = require("@pennlabs/kittyhawk");
const cdk8s_1 = require("cdk8s");
class MyChart extends kittyhawk_1.PennLabsChart {
    constructor(scope, id) {
        super(scope, id);
        const image = 'pennlabs/penn-basics';
        const secret = 'penn-basics';
        const domain = 'pennbasics.com';
        new kittyhawk_1.ReactApplication(this, 'react', {
            deployment: {
                image,
                secret,
            },
            domain: { host: domain, paths: ['/'] },
        });
    }
}
exports.MyChart = MyChart;
const app = new cdk8s_1.App();
new MyChart(app, (_a = process.env.RELEASE_NAME) !== null && _a !== void 0 ? _a : 'penn-basics');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLG1EQUFzRTtBQUN0RSxpQ0FBNEI7QUFFNUIsTUFBYSxPQUFRLFNBQVEseUJBQWE7SUFDeEMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLEtBQUssR0FBRyxzQkFBc0IsQ0FBQztRQUNyQyxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUM7UUFDN0IsTUFBTSxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7UUFFaEMsSUFBSSw0QkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFO1lBQ2xDLFVBQVUsRUFBRTtnQkFDVixLQUFLO2dCQUNMLE1BQU07YUFDUDtZQUNELE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUU7U0FDdkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBaEJELDBCQWdCQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLG1DQUFJLGFBQWEsQ0FBQyxDQUFDO0FBQzVELEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgUGVubkxhYnNDaGFydCwgUmVhY3RBcHBsaWNhdGlvbiB9IGZyb20gJ0BwZW5ubGFicy9raXR0eWhhd2snO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnY2RrOHMnO1xuXG5leHBvcnQgY2xhc3MgTXlDaGFydCBleHRlbmRzIFBlbm5MYWJzQ2hhcnQge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IGltYWdlID0gJ3Blbm5sYWJzL3Blbm4tYmFzaWNzJztcbiAgICBjb25zdCBzZWNyZXQgPSAncGVubi1iYXNpY3MnO1xuICAgIGNvbnN0IGRvbWFpbiA9ICdwZW5uYmFzaWNzLmNvbSc7XG5cbiAgICBuZXcgUmVhY3RBcHBsaWNhdGlvbih0aGlzLCAncmVhY3QnLCB7XG4gICAgICBkZXBsb3ltZW50OiB7XG4gICAgICAgIGltYWdlLFxuICAgICAgICBzZWNyZXQsXG4gICAgICB9LFxuICAgICAgZG9tYWluOiB7IGhvc3Q6IGRvbWFpbiwgcGF0aHM6IFsnLyddIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuY29uc3QgYXBwID0gbmV3IEFwcCgpO1xubmV3IE15Q2hhcnQoYXBwLCBwcm9jZXNzLmVudi5SRUxFQVNFX05BTUUgPz8gJ3Blbm4tYmFzaWNzJyk7XG5hcHAuc3ludGgoKTsiXX0=