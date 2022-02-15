import { schedule } from 'node-cron';

export default (app) => {

    schedule('00 05 * * *', async () => {
        try {
            await run();
        } catch (error) {
            console.log(error)
        }
    });

    async function run() {
        console.log('cron')
        return true;
    }

    run();
}

